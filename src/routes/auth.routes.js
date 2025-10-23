const { Router } = require("express");
const { REGISTER, LOGIN } = require("../controllers/auth.controller");

const router = Router();

router.post("/register", REGISTER);
router.post("/login", LOGIN);

module.exports = router;
