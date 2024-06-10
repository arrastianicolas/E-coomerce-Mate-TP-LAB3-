import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/Auth.context";

const Protected = () => {
  const { user } = useContext(AuthenticationContext);

  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default Protected;
