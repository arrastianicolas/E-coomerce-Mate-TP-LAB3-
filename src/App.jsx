import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./components/cart/Cart.jsx";
import Landing from "./components/Dashboard/Landing/Landing.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Client from "./components/client/Client.jsx";
import Seller from "./components/Seller/Seller.jsx";
import MyPurchases from "./components/client/MyPurchases.jsx";
import ProductForSale from "./components/Seller/productsForSale/ProducstForSale.jsx";
import SaleHistory from "./components/Seller/saleHistory/SaleHistory.jsx";
import Protected from "./Routes/Protected";
import Admin from "./components/admin/Admin.jsx";

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
      path: "/",
      element: <Protected allowedRoles={["client"]} />,
      children: [
        {
          path: "/client",
          element: <Client />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/mypurchases",
          element: <MyPurchases />,
        },
      ],
    },
    {
      path: "/",
      element: <Protected allowedRoles={["seller"]} />,
      children: [
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
      ],
    },
    {
      path: "*",
      element: <Landing />,
    },
    {
      path: "/",
      element: <Protected allowedRoles={["admin"]} />,
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
