import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CartWizard from "../components/CartWizard";
import { Store } from "../utils/Srore";

function Payment() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { paymentMethod } = cart;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      alert("you need to select a payment method for placing order");
    }
    dispatch({ type: "SET_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };
  useEffect(() => {
    setSelectedPaymentMethod(paymentMethod ? paymentMethod : "");
  }, [paymentMethod]);
  return (
    <>
      <CartWizard activeStep={2} />
      <form className="mx-auto max-w-md mt-5" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <button className="primary-button">Submit</button>
      </form>
    </>
  );
}

export default Payment;
