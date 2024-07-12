import React from "react";

import "./App.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { themeState } from "./atom/theme";
function App() {
  const theme = useRecoilValue(themeState);
  const themeObject = theme === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyle />

      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>

      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
}

export default App;
