import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./MainRouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  </React.StrictMode>
);
