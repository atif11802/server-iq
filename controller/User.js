const User = require("../model/User");
const { generateToken } = require("../utils/generateToken");

const regesterUser = async (req, res) => {
	const { email, password, name } = req.body;

	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).json({ error: "User already exist" });
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		return res.status(400).json({ error: "Invalid user data" });
	}
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Invalid Email or Password");
		}
	} catch {
		res.status(400);
		return res.json({ error: "Invalid user data" });
	}
};

module.exports = {
	regesterUser,
	signIn,
};
