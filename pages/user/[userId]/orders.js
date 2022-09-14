import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: payload.data };
    default:
      return state;
  }
};

function Orders() {
  const router = useRouter();
  const [{ orders, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    orders: [],
    error: "",
  });
  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    async function getOrderByUser() {
      const res = await fetch(`/api/user/orders`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "FETCH_SUCCESS", payload: data.orders });
    }
    getOrderByUser();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : orders.length === 0 ? (
        <div>
          No previous orders found go and{" "}
          <Link href={"/"}>
            <a className="text-xl text-indigo-300">Shop</a>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl my-2">Your Orders</h1>
          <table className="min-w-full">
            <thead className="border-b">
              <th className="p-5 text-left">OrderId</th>
              <th className="p-5 text-right">Payment Method</th>
              <th className="p-5 text-right">Total Price</th>
              <th className="p-5 text-right">Payment</th>
              <th className="p-5 text-right">Deliverd</th>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td>{order._id}</td>
                  <td className="p-5 text-right">{order.paymentMethod}</td>
                  <td className="p-5 text-right">{order.totalPrice}</td>
                  <td className="p-5 text-right">
                    {order.idPaid ? (
                      <div className="bg-green-400 p-1 rounded text-center">
                        Payment Confirmed
                      </div>
                    ) : (
                      <div className="bg-red-400 p-1 rounded text-center">
                        Not Confirmed
                      </div>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    {order.idDelivered ? (
                      "Delivered"
                    ) : !order.idPaid ? (
                      <button
                        className="primary-button"
                        onClick={() =>
                          router.replace(`/placeorder/${order._id}`)
                        }
                      >
                        Pay/Cancel order
                      </button>
                    ) : (
                      "On The Way"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export default dynamic(() => Promise.resolve(Orders), { ssr: false });
Orders.auth = true;
