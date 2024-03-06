const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required']
    },
    orderDetails: []
})

const orderModel = mongoose.model('order', ordersSchema);

module.exports = orderModel
