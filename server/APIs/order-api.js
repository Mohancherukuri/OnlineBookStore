const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {processOrder,getPreviousOrders} = require("../Controllers/order-controller");
const verfiyToken = require("../Middleware/verifyToken")
const orderApp = express.Router();

//Process Order
orderApp.put("/process-order",verfiyToken,expressAsyncHandler(processOrder));

//Get Previous Orders
orderApp.get("/get-orders",expressAsyncHandler(getPreviousOrders));

module.exports = orderApp;