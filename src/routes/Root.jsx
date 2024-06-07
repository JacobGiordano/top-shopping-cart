import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";
import data from "../data/products.json";
import CartDrawer from "../components/CartDrawer";

function Root() {
  const storedData = JSON.parse(sessionStorage.getItem("cart"));
  const [cart, setCart] = useState(storedData || []);
  const [draweIsOpen, setDraweIsOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);
  return (
    <>
      <Header
        cart={cart}
        draweIsOpen={draweIsOpen}
        setDraweIsOpen={setDraweIsOpen}
      />
      <CartDrawer
        cart={cart}
        setCart={setCart}
        draweIsOpen={draweIsOpen}
      ></CartDrawer>
      {/* Passing context using object structuring */}
      <Outlet context={{ cart, setCart, data }} />
      <Footer />
    </>
  );
}
export default Root;
