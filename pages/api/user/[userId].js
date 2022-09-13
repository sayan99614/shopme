import db from "../../../utils/db";
import User from "../../../models/User";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const userId = req.query.userId;
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .send({ message: "Unauthorized you need to login first" });
  }
  if (userId !== session.user._id) {
    return res
      .status(401)
      .json({ message: "unauthorized you can't access other user" });
  }

  try {
    await db.connect();
    const user = await User.findOne({
      _id: userId,
    });
    db.disconnect();
    if (!user) {
      throw Error("user not found with that id");
    }
    res.status(200).json({
      _id: user._id,
      email: user.email,
      image: "f",
      name: user.name,
    });
  } catch (error) {
    res.status(404).json({ message: "user not found" });
    db.disconnect();
  }
}
