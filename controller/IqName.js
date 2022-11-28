const Iq = require("../model/IqName");

//post IqName

const postIq = async (req, res) => {
	try {
		const { name, iq } = req.body;

		const exist = await Iq.findOne({ name });

		if (exist) {
			return res.status(400).json({
				message: "Name already exist",
			});
		}

		const newIq = new Iq({
			name,
			iq,
		});

		const iqLength = Iq.find({ name });

		if (iqLength.length <= 100) {
			return res.status(400).json({
				message: "You can only add 100 questions",
			});
		}
		await newIq.save();
		res.status(201).json(newIq);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

//get IqName

const getIqName = async (req, res) => {
	try {
		const iqName = await Iq.find().select("-iq");
		res.status(200).json(iqName);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//get Iq set

const getIqSet = async (req, res) => {
	try {
		const { id } = req.params;
		const iqSet = await Iq.findOne({ id }).select("-name");

		res.status(200).json(iqSet);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//update Iq name

const updateIqName = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const exist = await Iq.findOne({ id });

		if (!exist) {
			return res.status(400).json({
				message: "Name does not exist",
			});
		}

		const updateIq = await Iq.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		).select("-iq");

		res.status(200).json(updateIq);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//update iq set

const updateIqSet = async (req, res) => {
	try {
		const { id } = req.params;
		const { iq } = req.body;

		const exist = await Iq.findOne({ id });

		if (!exist) {
			return res.status(400).json({
				message: "Name does not exist",
			});
		}

		if (iq.length > 100) {
			return res.status(400).json({
				message: "You can only add 100 questions",
			});
		}

		const updateIq = await Iq.findByIdAndUpdate(
			id,
			{ iq },
			{ new: true }
		).select("-name");

		return res.status(200).json(updateIq);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

module.exports = { postIq, getIqName, getIqSet, updateIqName, updateIqSet };
