import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../routes/Cart";
import { Section } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Header />
      <Section>
        <Outlet />
      </Section>
      <Cart />
      <Footer />
    </>
  );
}
export default Root;
