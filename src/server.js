

const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const mainRouter = require("./routes/index");

dotenv.config();

const app = express();
app.use(express.json());

// 🔹 Router
app.use("/api", mainRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
