const { Router } = require("express");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;
