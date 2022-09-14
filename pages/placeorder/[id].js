import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return { ...state, loading: true };
    case "FETCH_ORDER_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "FETCH_ORDER_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    default:
      return state;
  }
};

export default function PlaceOrderById() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const router = useRouter();
  const { data: session } = useSession();
  const orderId = router.query.id;
  const [
    { loading, order, error, loadingPay, errorPay, successPay },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    loadingPay: false,
    successPay: false,
    errorPay: "",
  });
  const [cancelLoading, setCancelLoading] = useState(false);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = order;

  useEffect(() => {
    const fetchorder = async () => {
      let data;
      dispatch({
        type: "FETCH_ORDER",
      });
      try {
        const res = await fetch(`/api/placeorder/${orderId}`);
        data = await res.json();
        dispatch({
          type: "FETCH_ORDER_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_ORDER_ERROR",
          payload: "something went wrong please try again later",
        });
      }
    };

    if (
      (orderId && (!order._id || (order._id && order._id !== orderId))) ||
      successPay
    ) {
      fetchorder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const res = await fetch("/api/keys/paypal");
        const { clientId } = await res.json();
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
      };
      loadPaypalScript();
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [order._id, orderId, paypalDispatch, successPay]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onApprove(data, actions) {
    actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const res = await fetch(`/api/placeorder/${orderId}/pay`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        const data = await res.json();
        console.log(data);
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "PAY_FAIL",
          payload: "Payment not completed please try again",
        });
        alert("Payment not completed please try again");
      }
    });
  }

  function onError(error) {
    alert("Something went wrong please try again later");
  }
  const handleCancel = () => {
    setCancelLoading(true);
    const result = confirm("Are you want confirm cancel order");
    async function cancelorder() {
      try {
        const res = await fetch(`/api/order/${orderId}`);
        const data = await res.json();
        alert(data.message);
        setCancelLoading(false);
        router.replace(`/user/${session.user._id}`);
      } catch (error) {
        alert("can't cancel at this moment plaease try again later");
        setCancelLoading(false);
      }
    }
    if (result) {
      cancelorder();
    } else {
      setCancelLoading(false);
    }
  };
  return (
    <>
      <h1 className="mb-4 text-xl">Order {orderId}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
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
              {isDelivered ? (
                <div className="alert-success">Delivered</div>
              ) : (
                <div className="alert-danger">Not delivered yet</div>
              )}
            </div>
            <div className="card p-5">
              <h1 className="mb-2 text-lg">Payment Status</h1>
              {isPaid ? (
                <div className="alert-success">Paid</div>
              ) : (
                <div className="alert-danger">Not paid yet</div>
              )}
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
                  {orderItems.map((item) => (
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
                    <div>${shippingPrice ? shippingPrice : 0}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    className="w-full secondery-button my-1"
                    onClick={handleCancel}
                  >
                    {cancelLoading ? "Loadig..." : "Cancel Order"}
                  </button>
                </li>
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      >
                        {loadingPay && <div>Loading...</div>}
                      </PayPalButtons>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
