import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CartWizard from "../components/CartWizard";
import { Store } from "../utils/Srore";

function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { cart } = state;
  const { shippingAddress } = cart;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  Cookies.get(cart);
  useEffect(() => {
    setValue("fullname", shippingAddress?.fullname);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postal", shippingAddress?.postal);
  }, [
    setValue,
    shippingAddress?.address,
    shippingAddress?.city,
    shippingAddress?.fullname,
    shippingAddress?.postal,
  ]);
  const submitHandler = (data) => {
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload: data });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          ...data,
        },
      })
    );
  };

  return (
    <>
      <CartWizard activeStep="1" />
      <form
        className="max-w-screen-md m-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-2xl">Shipping address</h1>
        <div className="mb-3 mt-2">
          <input
            type="text"
            name="fullname"
            className="w-full"
            {...register("fullname", {
              required: "please enter your full name",
            })}
            placeholder="enter your fullname"
          />
          {errors.fullname && (
            <div className="text-red-400">{errors.fullname.message}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="address"
            {...register("address", {
              required: "please enter your address",
            })}
            className="w-full"
            placeholder="enter your address"
          />
          {errors.address && (
            <div className="text-red-400">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="city"
            {...register("city", {
              required: "please enter your city details",
            })}
            className="w-full"
            placeholder="enter your city"
          />
          {errors.city && (
            <div className="text-red-400">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="postal"
            {...register("postal", {
              required: "please enter your postal code",
            })}
            className="w-full"
            placeholder="enter your postal code"
          />
          {errors.postal && (
            <div className="text-red-400">{errors.postal.message}</div>
          )}
        </div>
        <button
          className="primary-button w-full"
          onClick={() => router.push("/payment")}
        >
          Proceed to payment
        </button>
      </form>
    </>
  );
}

export default ShippingScreen;

ShippingScreen.auth = true;
