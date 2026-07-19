var express = require('express');
var router = express.Router();
let itmesController = require('../controllers/items');
let authController =  require('../controllers/auth');
router.get("/", 
    // authController.validateToken, 
    authController.logToken, 
    itemsController.getAll);
router.post("/",     
    // authController.validateToken, 
    authController.logToken, 
    itemssController.add);
router.get("/:id", authController.validateToken, itemsController.getById);
router.put("/:id", itemsController.update);
router.delete("/:id", projectsController.remove);
module.exports = router;