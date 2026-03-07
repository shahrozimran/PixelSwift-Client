import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { lightTheme } from "./styles/theme";

// Set global styles
document.body.style.margin = '0';
document.body.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
document.body.style.backgroundColor = lightTheme.bgColor;
document.body.style.color = lightTheme.textMain;
document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);