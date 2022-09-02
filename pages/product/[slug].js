import { useRouter } from "next/router";
import data from "../../utils/data";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../../utils/Srore";

export default function ProductPage() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const slug = router.query.slug;
  const product = data.products.find((p) => p.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    let quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(quantity);

    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });

    return;
  };
  return (
    <>
      <Head>
        <title>{`🛒Shopme- ${product.name}`}</title>
      </Head>
      <div
        className="py-2 text-4xl cursor-pointer"
        onClick={() => router.back()}
      >
        🔙
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            layout="responsive"
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name}</h1>
            </li>
            <li>Caregory: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              Rating: {product.rating} of {product.numReviews}
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div className="card p-5 max-h-36">
          <div className="flex justify-between mb-2">
            <div>Price</div>
            <div>{product.price}</div>
          </div>
          <div className="flex justify-between">
            <div>Status</div>
            <div>{product.countInStock}</div>
          </div>
          <button
            className="primary-button w-full mt-2"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
