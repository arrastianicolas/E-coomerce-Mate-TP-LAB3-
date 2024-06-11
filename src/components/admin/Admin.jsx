import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLanding from "../navs/NavBarLanding";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);

  const handleUserListClick = () => {
    navigate("/userList");
  };

  const handleShopClick = () => {
    navigate("/shop");
  };

  return (
    <>
      <NavBarLanding />
      <div className="admin-container">
        {user && user.userType === "sysAdmin" && (
          <>
            <h1>Usted ha ingresado como admin</h1>
            <button onClick={handleUserListClick} className="btn btn-primary">
              Lista de Usuarios
            </button>
            <button onClick={handleShopClick} className="btn btn-secondary">
              Tienda
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
