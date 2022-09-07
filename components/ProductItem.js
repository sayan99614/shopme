import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../utils/Srore";

function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const handleClick = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    let quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity < product.countInStock) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    } else {
      alert("product is out of stock");
    }
  };
  return (
    <div className="card cursor-pointer">
      <img
        src={product.image}
        alt={product.name}
        className="rounded shadow"
        onClick={() => router.push(`/product/${product.slug}`)}
      />
      <div className="flex flex-col items-center justify-center p-5">
        <h2 className="text-lg">{product.name}</h2>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
