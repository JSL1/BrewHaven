const { default: mongoose } = require('mongoose');
let moogoose = require('mongoose');

const orderItemLinesModel = new mongoose.Schema({
    orderId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  itemId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  priceAtPurchase: { 
    type: Number, 
    required: true }
},
{
    collection: 'orderItemLines'
});

orderItemLinesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("OrderItemLines", ordersItemLinesModel);