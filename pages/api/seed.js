import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";
import Product from "../../models/Product";

export default async function handler(req, res) {
  try {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    res.status(200).send({ message: "seed inserted successfully" });
  } catch (error) {
    res.status(500).send({ error: "internal server errror" });
  }
}
