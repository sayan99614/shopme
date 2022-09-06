import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { StorePovider } from "../utils/Srore";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StorePovider>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StorePovider>
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  return children;
}
