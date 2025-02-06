import UserOrder from '../user-order/order.model.js'

 const createUserOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, paymentMethod } = req.body;

    const newOrder = new UserOrder({
      userId,
      products,
      totalAmount,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
};


 const getUserOrders = async (req, res) => {
  try {
    const orders = await UserOrder.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
};


 const getUserOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await UserOrder.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders by userId" });
  }
};



const deleteUserOrderItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

  
    const order = await UserOrder.findOne({ userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

   
    const item = order.products.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

   
    order.products.pull({ _id: itemId });

    
    await order.save();

 
    res.status(200).json({ message: "Item deleted successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting order item" });
  }
};


export default {createUserOrder,getUserOrders,deleteUserOrderItem,getUserOrdersByUserId}