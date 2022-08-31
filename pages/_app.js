import Layout from "../components/Layout";
import "../styles/globals.css";
import { StorePovider } from "../utils/Srore";

function MyApp({ Component, pageProps }) {
  return (
    <StorePovider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StorePovider>
  );
}

export default MyApp;
