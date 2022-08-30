import { useRouter } from "next/router";
import React from "react";

function ProductItem({ product }) {
  const router = useRouter();
  return (
    <div
      className="card"
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      <img src={product.image} alt={product.name} className="rounded shadow" />
      <div className="flex flex-col items-center justify-center p-5">
        <h2 className="text-lg">{product.name}</h2>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
