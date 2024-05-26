import Header from "../components/Header";
import Footer from "../components/Footer";
import { Section } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Root() {
  const [cart, setCart] = useState([]);
  console.log(cart);
  return (
    <>
      <Header />
      <Section>
        {/* Passing context using object structuring */}
        <Outlet context={{ cart, setCart }} />
      </Section>
      <Footer />
    </>
  );
}
export default Root;
