import { useNavigate } from "react-router-dom";

const NavBarLanding = () => {
  const navigate = useNavigate();
  const clickHandlerLogin = () => {
    navigate("/login");
  };
  const clickHandlerMain = () => {
    navigate("/");
  };
  return (
    <div className="navbar-landing">
      <button className="btn btn-light buttons-navs" onClick={clickHandlerMain}>
        INICIO
      </button>
      <div className="nav2">
        <button className="btn btn-light buttons-navs">Registrarme</button>
        <button
          className="btn btn-light buttons-navs"
          onClick={clickHandlerLogin}
        >
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default NavBarLanding;
