var authController = require('../controllers/auth');
var express = require('express');
var router = express.Router();

var ordersController = require('../controllers/orders');

router.get('/', authController.validateToken, ordersController.getAll);
router.post('/', authController.validateToken, ordersController.add);
router.get('/:orderId', authController.validateToken, ordersController.getOrderDetails);
router.put('/:id', authController.validateToken, ordersController.update);

module.exports = router;