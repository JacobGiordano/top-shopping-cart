import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import data from "../data/products.json";
import CartDrawer from "../components/CartDrawer";
import ScrollLock from "../components/ScrollLock";

function Root() {
  const storedData = JSON.parse(sessionStorage.getItem("cart"));
  const [cart, setCart] = useState(storedData || []);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const headerRef = useRef(null);
  const cartDrawerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setDrawerIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (cartDrawerRef.current) {
      cartDrawerRef.current.scrollTop = headerRef.current.clientHeight;
    }
  }, [drawerIsOpen]);

  const handleCartDrawerOverlayClick = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <div className='relative overflow-clip'>
      <ScrollLock boolVal={drawerIsOpen} />
      <Header
        cart={cart}
        drawerIsOpen={drawerIsOpen}
        setDrawerIsOpen={setDrawerIsOpen}
        location={location}
        ref={headerRef}
      />
      {location.pathname !== "/cart" && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
          location={location}
          ref={cartDrawerRef}
        ></CartDrawer>
      )}
      {drawerIsOpen && (
        <div
          className='absolute top-0 left-0 w-full h-full z-20 hover:cursor-pointer'
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
          headerRef,
        }}
      />
      <Footer />
    </div>
  );
}
export default Root;
