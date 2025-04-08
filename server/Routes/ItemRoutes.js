const express = require("express");
const itemRouter = express.Router();

const Item = require("../Model/ItemModel");
const ItemController = require("../controllers/ItemController");
itemRouter.get("/", ItemController.getAllItems);
itemRouter.post("/AddItem", ItemController.AddItems);
itemRouter.get("/itemgetById/:id", ItemController.itemgetById);
itemRouter.put("/updateItem/:id", ItemController.updateItem);
itemRouter.delete("/deleteItem/:id", ItemController.deleteItem);

module.exports = itemRouter;
