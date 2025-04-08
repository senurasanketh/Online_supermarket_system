const express = require("express");
const PaymentDetailsRouter = express.Router();

const Payment = require("../Model/PaymentDetailsModel");

const PaymentDetailsController = require("../controllers/PaymentDetailsController");

SupplierRouter.get("/", PaymentDetailsController.getAllPaymentDetails);
SupplierRouter.post("/addPayment", PaymentDetailsController.addPayments);
SupplierRouter.get(
  "/getPaymentById/:id",
  PaymentDetailsController.paymentgetById
);

SupplierRouter.delete(
  "/deletePayment/:id",
  PaymentDetailsController.deletePayment
);

module.exports = PaymentDetailsRouter;
