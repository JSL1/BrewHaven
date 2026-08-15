const mongoose = require('mongoose');

const ordersModel = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    },

    customerName: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ['Pending', 'Served', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    collection: 'orders'
  }
);

ordersModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Orders', ordersModel);