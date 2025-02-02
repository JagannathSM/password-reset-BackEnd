const express = require("express");
const { registerUser, loginUser, resetPassToken, verifyToken, createNewPass } = require("../Controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/reset-pass", resetPassToken);

router.get('/verify-token/:passResetToken', verifyToken)

router.put("/update-pass/:passResetToken", createNewPass)

module.exports = router;
