import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
export default async function Handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(400).send({ message: "Unauthorized please login" });
  }

  await db.connect();

  const order = await Order.findById(req.query.id);

  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "Order is already paid" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    const paidOrder = await order.save();
    await db.disconnect();
    res
      .status(200)
      .send({ message: "payment completed successfullys", order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "oder not found" });
  }
}
