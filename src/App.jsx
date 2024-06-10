import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/Dashboard/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";

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
      path: "*",
      element: <Landing />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
