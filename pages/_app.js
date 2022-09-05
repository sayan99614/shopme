import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { StorePovider } from "../utils/Srore";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StorePovider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StorePovider>
    </SessionProvider>
  );
}

export default MyApp;
