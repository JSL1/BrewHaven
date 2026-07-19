var express = require('express');
var router = express.Router();

var itemsController = require('../controllers/items');

router.get('/', itemsController.getAll);
router.post('/', itemsController.add);
router.get('/:itemId', itemsController.getById);
router.put('/:id', itemsController.update);
router.delete('/:id', itemsController.remove);

module.exports = router;