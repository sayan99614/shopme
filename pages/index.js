import Head from "next/head";
import ProductItem from "../components/ProductItem";
import styles from "../styles/Home.module.css";
import data from "../utils/data";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>🛒Shopme - One stop shop for your essential needs</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.connect();
  return {
    props: {
      products: products.map((product) => ({
        ...product,
        _id: toString(product._id),
      })),
    },
  };
}
