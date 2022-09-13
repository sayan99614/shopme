import { getSession } from "next-auth/react";
import db from "../../../../utils/db";
import Order from "../../../../models/Order";
export default async function Handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send({ message: "login required" });
    }

    await db.connect();
    const order = await Order.findOne({ _id: req.query.id });
    await db.disconnect();

    if (!order) {
      return res.status(404).send({ message: "order not found" });
    }

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
