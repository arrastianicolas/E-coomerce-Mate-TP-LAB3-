import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../services/auth/Auth.context";

const Protected = ({ allowedRoles }) => {
  const { user } = useContext(AuthenticationContext);

  // Si el usuario no está autenticado, redirigir a la página principal
  if (!user) return <Navigate to="/" replace />;

  // Si el usuario no tiene un rol permitido, redirigir a la página principal
  if (!allowedRoles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado y tiene un rol permitido, mostrar el contenido protegido
  return <Outlet />;
};

export default Protected;
