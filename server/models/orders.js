const { default: mongoose } = require('mongoose');
let moogoose = require('mongoose');

let ordersModel = mongoose.Schema({
    customerName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Served', 'Cancelled'], default: 'Pending' }
});

ordersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Orders", ordersModel);