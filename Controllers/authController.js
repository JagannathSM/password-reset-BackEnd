const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const sendPassResetEmail = require("../Utils/EmailServices");

dotenv.config();

const generateToken = (user) => {
  const jwtData = { _id: user._id, userName: user.userName, email: user.email };
  return jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("Email already exisits");
    } else {
      const salt = parseInt(process.env.SALT);
      const hasedPassword = await bcrypt.hash(password, salt);
      const new_user = new User({ userName, password: hasedPassword, email });
      await new_user.save();
      res.status(200).json({
        message: "Successfully Registered",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const check_user = await User.findOne({ email });
    if (!check_user) {
      return res.status(404).send("Email Not Exists");
    }
    const isMatch = await bcrypt.compare(password, check_user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }
    // const jwtData = { _id:check_user._id, userName: check_user.userName, email: check_user.email}
    // const token = jwt.sign(jwtData, process.env.JWTSCERET,{expiresIn:"10m"})

    res.status(200).json({
      token: generateToken(check_user),
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.resetPassToken = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    return res.status(404).send( "Email Not found" );
  }

  const passResetToken = Math.random().toString(36).slice(-8);
  userData.passResetToken = passResetToken;
  userData.passResetTokenExp = Date.now() + 3600000; //Validate for 1hr

  await userData.save();

  const message = `<div style="diaplay:flex;flex-direction:column;justify-content:center;text-align: center;background-color: lightblue;border: 5px outset black;color:black">
  <div style="padding:10px;margin:5px">
  <h3 style="margin:0px">Password Reset Request</h3>
  <p>Your Password reset token - ${passResetToken}. Click on the below link to reset your password, this link expires in 1hr. <br>  If you did not request this, please ignore this email and your password will remain unchanged.</p>
  <a style="text-decoration:none; border:1px solid black; background-color:black;color:white;padding:4px;border-radius:5px" type="button" href="${process.env.NETLIFY}${passResetToken}" target="_blank">Reset Password</a>
  </div>
  </div>`;
  sendPassResetEmail({
    email: userData.email,
    subject: "Password Reset Request",
    message,
    res,
  });
};


exports.createNewPass = async (req, res) => {
  const { passResetToken } = req.params;
  const { newPassword } = req.body;
  const user = await User.findOne({ passResetToken });

  if (!user) {
        return res
          .status(404)
          .send("Invalid Password reset Token");
      }

  if (Date.parse(user.passResetTokenExp) < Date.now()) {
    return res.status(500).send("Reset Token Expires!" );
  }

  if (!newPassword) {
    return res.status(400).send("Required Field new_password");
  }

  const salt = parseInt(process.env.SALT);
  const hasedPassword = await bcrypt.hash(newPassword, salt);

  await User.updateOne(
    { _id: user._id },
    { password: hasedPassword, passResetToken: null, passResetTokenExp: null }
  );
  res.status(201).json({ message: "Updated password Succesfully" });
};
