import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./css/Landing.css";
import "./css/Hands.css";
import "./css/Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/LogIn.css";
import "./css/Seller.css";
import "./css/Register.css";
import "./css/Client.css";
import "./css/ProductsForSale.css";
import "./css/SaleHistory.css";
import { AuthenticationContextProvider } from "./services/auth/Auth.context.jsx";
import "./css/MyPurchases.css";
import { ApiContextProvider } from "./services/apiContext/Api.context.jsx";
import "./css/Cart.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiContextProvider>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </ApiContextProvider>
  </React.StrictMode>
);
