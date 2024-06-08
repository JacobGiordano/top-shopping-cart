import "@radix-ui/themes/styles.css";
import "./index.css";
import { Box, Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance='dark'>
      <Box px='4' className='theme-inner-wrapper overflow-auto h-dvh'>
        <App />
      </Box>
    </Theme>
  </React.StrictMode>
);
