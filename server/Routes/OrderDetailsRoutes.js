const express = require("express");
const OrderDetailsRouter = express.Router();

const Order = require("../Model/OrderDetailsModel");

const OrderDetailsController = require("../controllers/OrderDetailsController");

OrderDetailsRouter.get("/", OrderDetailsController.getAllOrder);
OrderDetailsRouter.post("/addOrder", OrderDetailsController.addOrders);
OrderDetailsRouter.get(
  "/getOrderById/:id",
  OrderDetailsController.ordergetById
);

OrderDetailsRouter.delete(
  "/deleteOrder/:id",
  OrderDetailsController.deleteOrder
);

module.exports = OrderDetailsRouter;
