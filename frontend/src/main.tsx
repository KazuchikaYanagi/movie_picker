import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
// import Header from "./features/Header.tsx";
// import Footer from "./features/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Header /> */}
      <App />
      {/* <Footer /> */}
    </BrowserRouter>
  </StrictMode>
);
