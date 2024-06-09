import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/Auth.context";

const NavBarLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleLogout } = useContext(AuthenticationContext);
  const clickHandlerRegister = () => {
    navigate("/register");
  };

  const clickHandlerLogin = () => {
    navigate("/login");
  };
  const clickHandlerMain = () => {
    navigate("/");
  };
  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  const clickHandlerShop = () => {
    navigate("/client");
  };

  const clickHandlerProductForSale = () => {
    navigate("/productForSale");
  };

  const clickHandlerSalesHistory = () => {
    navigate("/salesHistory");
  };

  return (
    <>
      {location.pathname === "/" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerRegister}
            >
              Registrarme
            </button>
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerLogin}
            >
              Iniciar Sesion
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/login" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerRegister}
            >
              Registrarme
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/register" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerLogin}
            >
              Iniciar Sesion
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/client" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={() => navigate("/mypurchases")}
            >
              Mis Compras
            </button>
            <button
              className="btn btn-light buttons-navs"
              style={{ marginLeft: "auto" }}
              onClick={handleLogOut}
            >
              Cerrar Sesión
            </button>
            <button
              className="bi bi-cart"
              style={{
                fontSize: "1.5rem",
                background: "none",
                border: "none",
                marginLeft: "20px",
              }}
              onClick={() => navigate("/carrito")}
            ></button>
          </div>
        </div>
      )}
      {location.pathname === "/seller" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerShop}
          >
            Tienda
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerProductForSale}
            >
              Productos en venta
            </button>
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerSalesHistory}
            >
              Historial de ventas
            </button>

            <button
              className="btn btn-light buttons-navs"
              style={{ marginLeft: "auto" }}
              onClick={clickHandlerMain}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/productForSale" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerShop}
          >
            Tienda
          </button>
        </div>
      )}
    </>
  );
};

export default NavBarLanding;
