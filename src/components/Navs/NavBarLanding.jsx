import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth/Auth.context";
import { ApiContext } from "../../services/apiContext/Api.context";

const NavBarLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleLogout, user } = useContext(AuthenticationContext);
  const { setCart } = useContext(ApiContext);

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
    setCart([]);
  };

  const clickHandlerShop = () => {
    navigate("/client");
  };

  const clickHandlerProductsForSale = () => {
    navigate("/productsForSale");
  };

  const clickHandlerSalesHistory = () => {
    navigate("/saleHistory");
  };

  const clickHandlerCart = () => {
    navigate("/cart");
  };

  const clickHandlerMenuSeller = () => {
    navigate("/seller");
  };
  const clickHandlerMenuAdmin = () => {
    navigate("/admin");
  };

  return (
    <>
      {location.pathname === "/" && !user && (
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
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/" && user && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          {user.userType === "client" && (
            <div className="nav2">
              <button
                className="btn btn-light buttons-navs"
                onClick={clickHandlerShop}
              >
                Tienda
              </button>
            </div>
          )}
          {user.userType === "seller" && (
            <div className="nav2">
              <button
                className="btn btn-light buttons-navs"
                onClick={clickHandlerMenuSeller}
              >
                Menu
              </button>
            </div>
          )}
          {user.userType === "sysAdmin" && (
            <div className="nav2">
              <button
                className="btn btn-light buttons-navs"
                onClick={clickHandlerMenuAdmin}
              >
                Menu
              </button>
            </div>
          )}
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
              Iniciar Sesión
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

                color: "white",
              }}
              onClick={clickHandlerCart}
            ></button>
          </div>
        </div>
      )}
      {location.pathname === "/seller" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMenuSeller}
          >
            Menu
          </button>
          <div className="nav2">
            <button
              className="btn btn-light buttons-navs"
              onClick={clickHandlerProductsForSale}
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
              onClick={handleLogOut}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
      {location.pathname === "/productsForSale" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMenuSeller}
          >
            Menu
          </button>
        </div>
      )}
      {location.pathname === "/saleHistory" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMenuSeller}
          >
            Menu
          </button>
        </div>
      )}
      {location.pathname === "/cart" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerShop}
          >
            Tienda
          </button>
        </div>
      )}
      {location.pathname === "/mypurchases" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerShop}
          >
            Tienda
          </button>
        </div>
      )}
      {location.pathname === "/admin" && (
        <div className="navbar-landing">
          <button
            className="btn btn-light buttons-navs"
            onClick={clickHandlerMain}
          >
            INICIO
          </button>
          <button className="btn btn-light buttons-navs" onClick={handleLogOut}>
            Cerrar Sesion
          </button>
        </div>
      )}
    </>
  );
};

export default NavBarLanding;
