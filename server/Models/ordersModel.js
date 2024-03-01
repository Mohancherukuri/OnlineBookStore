const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    username: String,
    orderDetails: []
})

const orderModel = mongoose.model('order', ordersSchema);

module.exports = orderModel
