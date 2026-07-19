var express = require('express');
var router = express.Router();
let usersController = require('../controllers/users');
router.post("/", usersController.add);
module.exports = router;