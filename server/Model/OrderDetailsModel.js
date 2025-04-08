const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String }, // Optional, add if you implement authentication
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  deliveryDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  }, // Default: 7 days from now
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
