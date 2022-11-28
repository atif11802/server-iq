const express = require("express");
const {
	postIq,
	getIqName,
	getIqSet,
	updateIqName,
	updateIqSet,
} = require("../controller/IqName");
const { protect, admin } = require("../Middleware/auth");
const router = express.Router();

//post iq
router.post("/iq", protect, admin, postIq);
//get iq name
router.get("/getIqName", getIqName);
//get iq set
router.get("/getIqSet/:id", getIqSet);
//update iq name
router.patch("/updateIqName/:id", protect, admin, updateIqName);
//update iq set
router.patch("/updateIqSet/:id", protect, admin, updateIqSet);

module.exports = router;
