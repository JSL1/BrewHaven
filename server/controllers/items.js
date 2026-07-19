let itemsModel = require('../models/items');

//CREATE item
module.exports.add = async function(req, res, next) {
    try {
        let newItem = ItemsModel(req.body);
        
        let result = await ItemsModel.create(newItem);

        console.log(result);

        res.json({
            success: true,
            message: "Item added successfully",
            data: result
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
}

//READ item
module.exports.getById = async function (req, res, next) {
    try {
        let itemId = req.params.id;
        let item = await ItemsModel.findOne({ _id: itemId});

        res.json({
            success:true,
            message: "item retreived successfully",
            data: item
        });
    } catch(err) {
        console.log(err);
        next(err);
    }
}

//UPDATE item
module.exports.update = async function (req, res, next) {
    try {
        let itemId = req.params.id;
        let updatedItem = ItemsModel(req.body);
        updatedItem._id = itemId;

        let result = await ItemsModel.updateOne({ _id: itemId }, updatedItem);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "item updated successfully."
            });
        } else {
            throw new Error('item not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//DELETE item
module.exports.remove = async function (req, res, next) {
    try {
        let itemId = req.params.id;

        let result = await ItemsModel.deleteOne({ _id: itemId });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "item deleted successfully."
            });
        }else {
            throw new Error('item not deleted. Are you sure it exists?');
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getAll = async function (req, res, next) {
    try {
        let list = await ItemsModel.find({});

        res.json({
            success: true,
            message: "item list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}