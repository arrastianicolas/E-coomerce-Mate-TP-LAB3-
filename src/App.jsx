import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Landing from "./components/dashboard/landing/Landing";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Client from "./components/client/Client";
import Seller from "./components/seller/Seller";
import MyPurchases from "./components/client/MyPurchases";
import ProductForSale from "./components/seller/productsForSale/ProducstForSale";
import SaleHistory from "./components/seller/saleHistory/SaleHistory";
import Protected from "./routes/Protected";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
