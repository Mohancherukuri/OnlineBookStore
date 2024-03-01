const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {processOrder,getPreviousOrders} = require("../Controllers/order-controller");

const orderApp = express.Router();

//Process Order
orderApp.put("/process-order",expressAsyncHandler(processOrder));

//Get Previous Orders
orderApp.get("/get-orders",expressAsyncHandler(getPreviousOrders));

module.exports = orderApp;