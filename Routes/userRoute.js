const express = require("express");
const auth = require('../Middleware/auth');
const { getUserData } = require("../Controllers/UserController");

const router = express.Router();

// Route to get active user data
router.get("/", auth, getUserData);


module.exports = router;