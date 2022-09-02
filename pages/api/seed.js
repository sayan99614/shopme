import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

export default async function handler(req, res) {
  try {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    res.status(200).send({ message: "seed inserted successfully" });
  } catch (error) {
    res.status(500).send({ error: "internal server errror" });
  }
}
