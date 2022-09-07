import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.models.Product
  ? mongoose.models.Product
  : mongoose.model("Product", Schema);

export default Product;
