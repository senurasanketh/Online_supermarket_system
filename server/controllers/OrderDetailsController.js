const Order = require("../Model/OrderDetailsModel");

const getAllOrder = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json({ orders });
};

const addOrders = async (req, res, next) => {
  const { orderid, userid, product, amount, date, paymentmethod } = req.body;

  try {
    const orders = new Order({
      orderid,
      userid,
      product,
      amount,
      date,
      paymentmethod,
    });
    await orders.save();
    return res.status(200).send({ orders });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const ordergetById = async (req, res, next) => {
  const id = req.params.id;
  let orders;

  try {
    orders = await Employee.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).send({ message: "unable to employee" });
  }
  return res.status(200).json({ orders });
};

const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  let orders;
  try {
    orders = await Order.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).send({ message: "unable to order" });
  }
  return res.status(200).json({ orders });
};

exports.addOrders = addOrders;
exports.getAllOrder = getAllOrder;
exports.ordergetById = ordergetById;

exports.deleteOrder = deleteOrder;
