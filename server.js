require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 8000;
const authUser = require("./routes/authRoutes");
const iqRoutes = require("./routes/IqRoutes");

//database connection
db();

// Middleware

app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

// Routes
app.use("/api", authUser);
app.use("/api", iqRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
