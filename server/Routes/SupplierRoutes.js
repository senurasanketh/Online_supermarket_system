const express = require("express");
const SupplierRouter = express.Router();

const Supplier = require("../Model/SupplierModel");

const SupplierController = require("../controllers/SupplierController");

SupplierRouter.get("/", SupplierController.getAllSuppliers);
SupplierRouter.post("/addSupplier", SupplierController.addSupplier);
SupplierRouter.get("/getSupplierById/:id", SupplierController.getSupplierById);
SupplierRouter.put("/updateSupplier/:id", SupplierController.updateSupplier);
SupplierRouter.delete("/deleteSupplier/:id", SupplierController.deleteSupplier);

module.exports = SupplierRouter;
