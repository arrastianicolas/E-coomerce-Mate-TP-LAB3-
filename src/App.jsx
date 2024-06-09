import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Dashboard/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Client from "./components/client/Client";

//import MyPurchases from "./components/client/MyPurchases";

// import Client from "./components/client/Client";

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
      path: "/client",
      element: <Client />,
    },
    // {
    //   path: "/mypurchases",
    //   element: <MyPurchases />,

    // {
    //   path: "/client",
    //   element: <Client />,

    // },
    {
      path: "/carrito",
      //poner element
    },
    {
      path: "*",
      element: <Landing />,
    },
    {
      path: "/shoppingCart",
      element: <ShoppingCart />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
