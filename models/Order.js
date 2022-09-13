import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  User: { type: mongoose.Schema.Types.ObjectId, required: true },
  shippingAddress: {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  deliveredAt: { type: Date },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    email_address: { type: String },
  },
});

const Order = mongoose.models.Order
  ? mongoose.models.Order
  : mongoose.model("Order", Schema);

export default Order;
