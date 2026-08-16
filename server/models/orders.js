const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Items",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const orderHistorySchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        comment: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const ordersModel = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            unique: true,
            default: () =>
                `ORD-${Date.now()}-${Math.floor(
                    Math.random() * 1000
                )}`
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function(items) {
                    return items.length > 0;
                },
                message: "An order must contain at least one item."
            }
        },
        orderNotes: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },
        pickupTime: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        completedAt: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: [
                "Pending",
                "Preparing",
                "Ready",
                "Served",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        },
        history: {
            type: [orderHistorySchema],
            default: []
        }
    },
    {
        collection: "orders"
    }
);

ordersModel.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function(document, returnedObject) {
        delete returnedObject._id;
    }
});

module.exports = mongoose.model("Orders", ordersModel);