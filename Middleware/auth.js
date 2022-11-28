const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
	let token;
	// let token = req.headers.authorization.replace("Bearer ", "");
	// console.log(token);
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.replace("Bearer ", "");

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (err) {
			return res.status(401).json({ error: "Not authorized ,token failed" });
		}
	}
	if (!token) {
		return res.status(401).json({ error: "No token found" });
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		return res.status(401).json({ error: "Not authorized as an admin" });
	}
};

module.exports = { protect, admin };
