import { useNavigate, useLocation } from "react-router-dom";

const NavBarLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const clickHandlerRegister = () => {
    navigate("/register");
  };
  
  const clickHandlerLogin = () => {
    navigate("/login");
  };
   const clickHandlerMain = () => {
    navigate("/");
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
            <button className="btn btn-light buttons-navs" onClick={clickHandlerRegister}>Registrarme</button>
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
    </>

  );
};

export default NavBarLanding;
