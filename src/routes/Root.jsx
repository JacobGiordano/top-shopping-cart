import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

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
      <Section>
        {/* Passing context using object structuring */}
        <Outlet context={{ cart, setCart }} />
      </Section>
      <Footer />
    </>
  );
}
export default Root;
