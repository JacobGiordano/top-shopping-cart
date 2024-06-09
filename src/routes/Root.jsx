import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import data from "../data/products.json";
import CartDrawer from "../components/CartDrawer";

function Root() {
  const storedData = JSON.parse(sessionStorage.getItem("cart"));
  const [cart, setCart] = useState(storedData || []);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document
      .querySelector(".theme-inner-wrapper")
      .classList.toggle("overflow-hidden");
  }, [drawerIsOpen]);

  useEffect(() => {
    setDrawerIsOpen(false);
  }, [location]);

  const handleCartDrawerOverlayClick = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  console.log(cart);
  console.log(location.pathname);
  return (
    <div className='relative overflow-hidden'>
      <Header
        cart={cart}
        drawerIsOpen={drawerIsOpen}
        setDrawerIsOpen={setDrawerIsOpen}
        location={location}
      />
      {location.pathname !== "/cart" && drawerIsOpen && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        ></CartDrawer>
      )}
      {drawerIsOpen && (
        <div
          className='absolute w-svw h-svh bg-black/50 z-10 hover:cursor-pointer'
          onClick={handleCartDrawerOverlayClick}
        ></div>
      )}
      {/* Passing context using object structuring */}
      <Outlet
        context={{
          cart,
          setCart,
          data,
          drawerIsOpen,
          setDrawerIsOpen,
        }}
      />
      <Footer />
    </div>
  );
}
export default Root;
