import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/Srore";

function Layout({ children }) {
  const { state } = useContext(Store);
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header>
        <nav className="flex justify-between h-12 shadow-md px-3 items-center">
          <Link href="/">
            <a className="text-lg font-bold">Shopme</a>
          </Link>

          <div>
            <Link href="/cart">
              <a className="p-2 mr-3">
                Cart
                {state.cart.cartItems.length > 0 && (
                  <span className="bg-red-400 rounded fixed top-0.5  px-1 ">
                    {state.cart.cartItems.reduce((a, e) => {
                      return a + e.quantity;
                    }, 0)}
                  </span>
                )}
              </a>
            </Link>
            <Link href="/Login">
              <a className="p-2">Login</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="container m-auto mt-4">{children}</main>
      <footer className=" flex justify-center items-center h-10 shadow-inner">
        Shopme all Rights Reserved
      </footer>
    </div>
  );
}

export default Layout;
