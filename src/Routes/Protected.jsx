import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/Auth.context";

const Protected = ({ allowedRoles }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protected;
