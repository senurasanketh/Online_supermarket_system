const express = require("express");
const OrderDetailsRouter = express.Router();
const OrderDetailsController = require("../controllers/OrderDetailsController");

// OrderDetailsRouter.get("/orders", OrderDetailsController.getAllOrder);
// OrderDetailsRouter.post("/orders/addOrders", OrderDetailsController.addOrders);
// OrderDetailsRouter.get("/orders/:id", OrderDetailsController.ordergetById);
// OrderDetailsRouter.delete("/orders/:id", OrderDetailsController.deleteOrder);

OrderDetailsRouter.post("/addOrders", OrderDetailsController.createOrder);
OrderDetailsRouter.get("/:orderId", OrderDetailsController.getOrder);

module.exports = OrderDetailsRouter;
