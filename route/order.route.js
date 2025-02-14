import express from "express";

import userOrderController from '../controllers/order.controller.js';

const router = express.Router();


router.post("/orders", userOrderController.createUserOrder);

router.get("/user/:userId", userOrderController.getUserOrdersByUserId);

router.delete("/userId/:userId/itemId/:itemId", userOrderController.deleteUserOrderItem);

export default router;
     