const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentDetailsSchema = new Schema({
  paymentid: {
    type: String,
    require: true,
  },

  orderid: {
    type: String,
    require: true,
  },
  customer: {
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
});
module.exports = mongoose.model("PaymentdetailsModel", paymentDetailsSchema);
