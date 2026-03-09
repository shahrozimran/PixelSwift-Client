import { createRoot } from "react-dom/client";
import App from "./App";
import { lightTheme } from "./styles/theme";
import "./styles/global.css"

// Set global styles
document.body.style.margin = '0';
document.body.style.fontFamily = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";
document.body.style.backgroundColor = lightTheme.bgColor;
document.body.style.color = lightTheme.textMain;
document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
document.body.style.WebkitFontSmoothing = 'antialiased';

const root = createRoot(document.getElementById("root"));
root.render(<App />);