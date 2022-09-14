import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";
export default async function Handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res
        .status(401)
        .json({ message: "unauthorized user please login first" });
    }
    await db.connect();
    const orders = await Order.find({ user: session.user._id });
    await db.disconnect();
    if (!orders) {
      return res.status(404).json({ message: "no orders found for the user" });
    }
    res.status(200).json({
      user: session.user._id,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}
