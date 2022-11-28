const mongoose = require("mongoose");

const IqSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		iq: [
			{
				question: {
					type: String,
					required: true,
				},
				a: {
					type: String,
					required: true,
				},
				b: {
					type: String,
					required: true,
				},
				c: {
					type: String,
					required: true,
				},
				d: {
					type: String,
				},
				correct: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Iq = mongoose.model("Iq", IqSchema);

module.exports = Iq;
