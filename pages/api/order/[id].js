import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";
export default async function Handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized please login first" });
  }
  await db.connect();
  const orderId = req.query.id;

  const order = await Order.deleteOne({ _id: orderId });

  if (!order) {
    return res.status(404).json({ message: "order not found" });
  }

  res
    .status(200)
    .send({ order, message: "order canceled successfully refund processed" });
}
