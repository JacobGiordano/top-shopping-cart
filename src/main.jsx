import "@radix-ui/themes/styles.css";
import "./index.css";
import { Box, Section, Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance='dark'>
      <Box
        px='4'
        className='theme-inner-wrapper bg-slate-950 overflow-auto h-dvh'
      >
        <Section>
          <App />
        </Section>
      </Box>
    </Theme>
  </React.StrictMode>
);
