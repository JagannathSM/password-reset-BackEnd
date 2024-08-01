const User = require("../Models/User");

exports.getUserData = async (req, res) => {
    const user = await User.findOne({ _id: req.user });
    console.log(user);
    res.status(200).json({user});
}
