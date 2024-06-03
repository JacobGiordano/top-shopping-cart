import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";
import data from "../data/products.json";
import testimonials from "../data/testimonials.json";

function Root() {
  const storedData = JSON.parse(sessionStorage.getItem("cart"));
  const [cart, setCart] = useState(storedData || []);
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);
  return (
    <>
      <Header cart={cart} />
      {/* Passing context using object structuring */}
      <Outlet context={{ cart, setCart, data, testimonials }} />
      <Footer />
    </>
  );
}
export default Root;
