import React from "react";

import "./App.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>

      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
}

export default App;
