import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import "@radix-ui/themes/styles.css";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance='dark'>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>
);
