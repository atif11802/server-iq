const mongoose = require("mongoose");

const db = async () => {
	try {
		await mongoose.connect("mongodb://0.0.0.0:27017/iqApp");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log(error);
	}
};

module.exports = db;
