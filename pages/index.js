import Head from "next/head";
import ProductItem from "../components/ProductItem";
import styles from "../styles/Home.module.css";
import data from "../utils/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>🛒Shopme - One stop shop for your essential needs</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
      </div>
    </>
  );
}
