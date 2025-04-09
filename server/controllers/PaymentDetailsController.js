const Payment = require("../Model/PaymentDetailsModel");

const getAllPaymentDetails = async (req, res, next) => {
  let payments;
  try {
    payments = await Payment.find();
  } catch (err) {
    console.log(err);
  }
  if (!payments) {
    return res.status(404).json({ message: "Payments not found" });
  }
  return res.status(200).json({ payments });
};

const addPayments = async (req, res, next) => {
  const { paymentid, orderid, customer, amount, date } = req.body;

  try {
    const orders = new Payment({
      paymentid,
      orderid,
      customer,
      amount,
      date,
    });
    await orders.save();
    return res.status(200).send({ orders });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const paymentgetById = async (req, res, next) => {
  const id = req.params.id;
  let payments;

  try {
    payments = await Payment.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!payments) {
    return res.status(404).send({ message: "unable to payment" });
  }
  return res.status(200).json({ payments });
};

// const deletePayment = async (req, res, next) => {
//   const id = req.params.id;
//   let payments;
//   try {
//     payments = await Order.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//   }
//   if (!payments) {
//     return res.status(404).send({ message: "unable to order" });
//   }
//   return res.status(200).json({ payments });
// };

exports.addPayments = addPayments;
exports.getAllPaymentDetails = getAllPaymentDetails;
exports.paymentgetById = paymentgetById;

// exports.deletePayment = deletePayment;
