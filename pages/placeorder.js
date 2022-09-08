import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CartWizard from "../components/CartWizard";
import { Store } from "../utils/Srore";

function Placeholder() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { cartItems, shippingAddress, paymentMethod } = state.cart;
  console.log(cartItems);
  const router = useRouter();
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, e) => {
      return a + e.quantity * e.price;
    }, 0)
  );
  const shippingPrice = round2(itemsPrice > 200 ? 0 : 15);
  const taxPrice = round2(itemsPrice * 0.5);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  useEffect(() => {
    if (!paymentMethod) {
      router.push("payment");
    }
  }, [paymentMethod, router]);
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      setLoading(false);
      alert("order placed successfully");
      dispatch({ type: "CLEAR_CART_ITEMS" });
      router.push(`orders/${data._id}`);
    } catch (error) {
      setLoading(false);
      alert("order could not placed please try again");
    }
  };
  return (
    <>
      <CartWizard activeStep={3} />
      <h1 className="mb-4 text-4xl">Place Order</h1>
      {cartItems.length === 0 && (
        <div>
          Empty cart items{" "}
          <Link href="/">
            <a className="text-indigo-300">Go Shopping</a>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-4 md:gap-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h1 className="mb-2 text-lg">Shipping Address</h1>
            <div>
              {shippingAddress.fullname} {shippingAddress.address}
              <br />
              {shippingAddress.address} {shippingAddress.city}
              <br />
              {shippingAddress.postal}
            </div>
            <Link href="/shipping">
              <a className="text-indigo-400">Edit</a>
            </Link>
          </div>
          <div className="card p-5">
            <h1 className="mb-2 text-lg">Payment Method</h1>
            <div>{paymentMethod}</div>
            <Link href="/payment">
              <a className="text-indigo-400">Edit</a>
            </Link>
          </div>
          <div className="card overflow-x-auto p-5">
            <h1 className="mb-2 text-lg">Order Items</h1>
            <table className="min-w-full">
              <thead className="border-b">
                <th className="p-5 text-left">Item</th>
                <th className="p-5 text-right">Quantity</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5 text-right">Subtotal</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.name} className="border-b">
                    <td>
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        <div>{item.name}</div>
                      </div>
                    </td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-3 text-right">{item.price}</td>

                    <td className="p-3 text-right">
                      {item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/cart">
              <a className="text-indigo-400">Edit</a>
            </Link>
          </div>
        </div>
        <div>
          <div className="card p-5">
            <h1 className="mb-2 text-lg">Order Summary</h1>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping Price</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
            </ul>
            <button
              onClick={handlePlaceOrder}
              className="primary-button w-full"
              disabled={loading}
            >
              {loading ? "Loading.." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Placeholder;
Placeholder.auth = true;
