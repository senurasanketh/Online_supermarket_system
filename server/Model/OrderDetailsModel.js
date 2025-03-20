const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderid: {
    type: String,
    require: true,
  },

  userid: {
    type: String,
    require: true,
  },
  product: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  paymentmetod: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("OrderDetailsModel", orderSchema);
