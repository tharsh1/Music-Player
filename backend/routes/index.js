const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
router.use("/public", require("./public"));
router.use("/user", isLoggedIn, require("./user"));
router.use("/auth", require("./auth"));
router.use("/admin", require("./admin"));
module.exports = router;
