var express = require('express');
var router = express.Router();

var ordersController = require('../controllers/orders');

router.get('/', ordersController.getAll);
router.post('/', ordersController.add);
router.get('/:orderId', ordersController.getOrderDetails);
router.put('/:id', ordersController.update);
router.delete('/:id', ordersController.remove);

module.exports = router;