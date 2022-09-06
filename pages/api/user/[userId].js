import db from "../../../utils/db";
import User from "../../../models/User";
export default async function handler(req, res) {
  const userId = req.query.userId;
  if (!userId) {
    res.status(422).json({ message: "invalid userid" });
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
