const { default: mongoose } = require('mongoose');
let moogoose = require('mongoose');

let itemsModel = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
        category: String
    },
    {
        collection: 'items
    }
);

itemsModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Items", itemsModel);