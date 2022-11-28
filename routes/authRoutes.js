const express = require("express");
const router = express.Router();
const { regesterUser, signIn } = require("../controller/User");

router.post("/signup", regesterUser);
router.post("/signin", signIn);

module.exports = router;
