import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Cart from "./components/Cart/Cart";
import Landing from "./components/dashboard/landing/Landing";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Client from "./components/client/Client";
import Seller from "./components/seller/Seller";
import MyPurchases from "./components/client/MyPurchases";
import ProductForSale from "./components/seller/productsForSale/ProducstForSale";
import SaleHistory from "./components/seller/saleHistory/SaleHistory";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },

    {
      path: "/client",
      element: <Client />,
    },
    {
      path: "/mypurchases",
      element: <MyPurchases />,
    },
  
    {
      path: "*",
      element: <Landing />,
    },
    {
      path: "/shoppingCart",
      element: <ShoppingCart />,
    },
    {
      path: "/seller",
      element: <Seller />,
    },
    {
      path: "/productsForSale",
      element: <ProductForSale />,
    },
    {
      path: "/saleHistory",
      element: <SaleHistory />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
