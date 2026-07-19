let ordersModel = require('../models/orders');

//CREATE order
module.exports.add = async function(req, res, next) {
    try {
        let newOrder = ordersModel(req.body);
        
        let result = await ordersModel.create(newOrder);

        console.log(result);

        res.json({
            success: true,
            message: "order added successfully",
            data: result
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
}

//READ order
module.exports.getOrderDetails = async function (req, res, next) {
    const orderId = req.params.orderId;
    const lines = await OrderLineItem.find({ orderId })
        .populate('itemId')
        .exec();

    return lines.map(line => ({ 
        itemName: line.itemId.title,
        price: line.itemId.price,
        subtotal: line.quantity * line.priceAtPurchase
    }));
}

//UPDATE order
module.exports.update = async function (req, res, next) {
    try {
        let orderId = req.params.id;
        let updatedorder = ordersModel(req.body);
        updatedorder._id = orderId;

        let result = await ordersModel.updateOne({ _id: orderId }, updatedorder);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "order updated successfully."
            });
        } else {
            throw new Error('order not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//DELETE order
module.exports.remove = async function (req, res, next) {
    try {
        let orderId = req.params.id;

        let result = await ordersModel.deleteOne({ _id: orderId });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "order deleted successfully."
            });
        }else {
            throw new Error('order not deleted. Are you sure it exists?');
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getAll = async function (req, res, next) {
    try {
        let list = await ordersModel.find({});

        res.json({
            success: true,
            message: "order list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}