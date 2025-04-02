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
  // console.log("object", req.body);
  try {
    // Optional query parameters for filtering and pagination
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build query object
    const query = {};
    if (status) {
      query.status = status;
    }
    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with sorting and pagination
    const orders = await Order.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v"); // Exclude version key

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
