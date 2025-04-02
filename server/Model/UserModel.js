const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Restrict to these values
    default: "user",
    // required: true, //1- admin  2-customer
  },
  status: {
    type: String, //0- delete    1-save
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserModel", userSchema);
