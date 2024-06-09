import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Dashboard/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Client from "./components/client/Client";
//import MyPurchases from "./components/client/MyPurchases";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
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
    // },
    {
      path: "*",
      element: <Landing />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
