import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Srore";
import dynamic from "next/dynamic";
function CartPage() {
  const { state, dispatch } = useContext(Store);
  const cartItems = state.cart.cartItems;
  const handleRemoveCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  const handleQuantity = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };
  return (
    <>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          No Items found in shopping cart go and <Link href="/">Shop</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <th className="px-3 text-left">Item</th>
                <th className="p-5 text-right">Quantity</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5">Action</th>
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
                    <td className="p-5 text-right">
                      <select
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleQuantity(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center cursor-pointer">
                      <span onClick={() => handleRemoveCart(item)}>✖️</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce((a, e) => {
                    return a + e.quantity;
                  }, 0)}
                  ) : $
                  {cartItems.reduce((a, e) => {
                    return a + e.quantity * e.price;
                  }, 0)}
                </div>
              </li>
              <li>
                <button className="primary-button w-full">Checkout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
