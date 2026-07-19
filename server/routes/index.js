var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');
router.get("/", indexController.welcome);
router.get("/hello", indexController.sayHello);
router.get("/bye", indexController.sayBye);
module.exports = router;