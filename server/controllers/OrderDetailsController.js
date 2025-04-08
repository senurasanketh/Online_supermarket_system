const Order = require("../Model/OrderDetailsModel");

exports.createOrder = async (req, res) => {
  try {
    const { items, total, paymentMethod, shippingAddress } = req.body;
    // console.log("createOrder::>", req.body);

    const order = new Order({
      items,
      total,
      paymentMethod,
      shippingAddress,
    });

    await order.save();
    res.status(201).json({
      message: "Order created successfully",
      order: {
        orderId: order._id,
        deliveryDate: order.deliveryDate,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// exports.getOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json(order);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching order", error: error.message });
//   }
// };

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Execute query with sorting and pagination
    const orders = await Order.find().sort({ createdAt: 1 });

    console.log("orders::>> ", orders);

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
