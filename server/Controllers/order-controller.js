const orderModel = require("../Models/ordersModel");
const url = require("url");
//Process the order
const processOrder = async (req, res) => {
    try {
        let orderData = req.body.updatedOrders;
        let username = req.body.username;
        let dbRes = await orderModel.findOne({ username: username });
        let prevOrders = dbRes.orderDetails;

        prevOrders.push(orderData);
        let dbRes1 = await orderModel.updateOne({ username: username },
            { $set: { orderDetails: prevOrders } });
        res.status(200).send({ message: "Order Proccessed" });
    } catch (error) {
        console.log("Process Order Error");
        console.log(error);
        res.status(500).send({ message: "Internal Server error" })
    }

}

const getPreviousOrders = async (req, res) => {
    try {
        let params = url.parse(req.url, true);
        let username = params.query.username;
        let userOrders = await orderModel.findOne({ username: username });

        let orderDetails = [];
        orderDetails = userOrders.orderDetails;

        let orderData = []

        orderDetails.map((items) => {
            let orderItems = { books: items.orderItems, date: items.date };
            orderData.push(orderItems);
        })
        console.log(typeof orderData)
        res.status(200).send({ message: "Data Received", payload: orderData });
    } catch (error) {
        console.log("GetPreviousOrders");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}



module.exports = { processOrder, getPreviousOrders }