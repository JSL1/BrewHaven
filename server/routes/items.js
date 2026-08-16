const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const itemsController = require("../controllers/items");

router.get(
    "/",
    itemsController.getAll
);

router.get(
    "/:id",
    itemsController.getById
);

router.post(
    "/",
    authController.validateToken,
    itemsController.add
);

router.put(
    "/:id",
    authController.validateToken,
    itemsController.update
);

router.delete(
    "/:id",
    authController.validateToken,
    itemsController.remove
);

module.exports = router;