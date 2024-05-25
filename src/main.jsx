import "@radix-ui/themes/styles.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box, Section, Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./routes/Cart";
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance='dark'>
      <Box
        px='4'
        className='theme-inner-wrapper bg-slate-950 overflow-auto h-dvh'
      >
        <Header />
        <Section>
          <RouterProvider router={router} />
        </Section>
        <Cart />
        <Footer />
      </Box>
    </Theme>
  </React.StrictMode>
);
