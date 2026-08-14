var express = require('express');
var router = express.Router();
let authController = require('../controllers/auth');

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/profile", authController.validateToken, authController.getProfile);
router.put("/profile", authController.validateToken, authController.updateProfile);

module.exports = router;