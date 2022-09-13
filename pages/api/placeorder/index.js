import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized please login " });
  }
  const { user } = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    User: user._id,
  });

  const order = await newOrder.save();

  res.status(201).send(order);
}
