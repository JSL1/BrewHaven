const OrdersModel = require("../models/orders");
const ItemsModel = require("../models/items");
const UsersModel = require("../models/users");

module.exports.add = async function(req, res, next) {
    try {
        const user = await UsersModel.findById(req.auth.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (
            !Array.isArray(req.body.items) ||
            req.body.items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "An order must contain at least one item."
            });
        }

        const pickupTime = new Date(
            req.body.pickupTime
        );

        if (Number.isNaN(pickupTime.getTime())) {
            return res.status(400).json({
                success: false,
                message:
                    "A valid pickup time is required."
            });
        }

        const requestedItemIds = req.body.items.map(
            (item) => item.itemId
        );

        const menuItems = await ItemsModel.find({
            _id: {
                $in: requestedItemIds
            }
        });

        const orderItems = [];

        for (const requestedItem of req.body.items) {
            const quantity = Number(
                requestedItem.quantity
            );

            if (
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Item quantities must be at least one."
                });
            }

            const menuItem = menuItems.find(
                (item) =>
                    item._id.toString() ===
                    requestedItem.itemId
            );

            if (!menuItem) {
                return res.status(400).json({
                    success: false,
                    message:
                        "One or more menu items were not found."
                });
            }

            orderItems.push({
                itemId: menuItem._id,
                title: menuItem.title,
                price: menuItem.price,
                quantity: quantity
            });
        }

        const customerName =
            `${user.firstname} ${user.lastname}`.trim();

        const newOrder = new OrdersModel({
            owner: user._id,
            customerName: customerName,
            items: orderItems,
            orderNotes: req.body.orderNotes || "",
            pickupTime: pickupTime,
            status: "Pending",
            history: [
                {
                    username: user.email,
                    date: new Date(),
                    comment: "Order created."
                }
            ]
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order added successfully.",
            data: savedOrder
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getAll = async function(
    req,
    res,
    next
) {
    try {
        const orders = await OrdersModel.find({
            owner: req.auth.id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            message:
                "Order list retrieved successfully.",
            data: orders
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getOrderDetails = async function(
    req,
    res,
    next
) {
    try {
        const order = await OrdersModel.findOne({
            _id: req.params.orderId,
            owner: req.auth.id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        res.json({
            success: true,
            message: "Order retrieved successfully.",
            data: order
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.update = async function(
    req,
    res,
    next
) {
    try {
        const order = await OrdersModel.findOne({
            _id: req.params.id,
            owner: req.auth.id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        const historyComment =
            req.body.historyComment?.trim();

        if (!historyComment) {
            return res.status(400).json({
                success: false,
                message:
                    "A history comment is required."
            });
        }

        if (req.body.orderNotes !== undefined) {
            order.orderNotes =
                req.body.orderNotes;
        }

        if (req.body.pickupTime !== undefined) {
            const pickupTime = new Date(
                req.body.pickupTime
            );

            if (Number.isNaN(pickupTime.getTime())) {
                return res.status(400).json({
                    success: false,
                    message:
                        "A valid pickup time is required."
                });
            }

            order.pickupTime = pickupTime;
        }

        if (req.body.status !== undefined) {
            const allowedStatuses = [
                "Pending",
                "Preparing",
                "Ready",
                "Served",
                "Completed",
                "Cancelled"
            ];

            if (
                !allowedStatuses.includes(
                    req.body.status
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid order status."
                });
            }

            order.status = req.body.status;

            if (
                req.body.status === "Served" ||
                req.body.status === "Completed"
            ) {
                order.completedAt = new Date();
            }
        }

        order.updatedAt = new Date();

        order.history.push({
            username: req.auth.email,
            date: new Date(),
            comment: historyComment
        });

        const updatedOrder =
            await order.save();

        res.json({
            success: true,
            message: "Order updated successfully.",
            data: updatedOrder
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};