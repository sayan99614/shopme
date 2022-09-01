import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Srore";

function Layout({ children }) {
  const { state } = useContext(Store);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(state.cart.cartItems);
  }, [state.cart.cartItems]);
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
                {cartItems.length > 0 && (
                  <span className=" bg-amber-400 rounded fixed top-0.5  px-1 ">
                    {cartItems.reduce((a, e) => {
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
