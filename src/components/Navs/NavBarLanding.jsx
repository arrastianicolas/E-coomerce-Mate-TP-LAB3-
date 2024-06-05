import { useNavigate } from "react-router-dom";

const NavBarLanding = () => {
  const navigate = useNavigate();
  const clickHandlerLogin = () => {
    navigate("/login");
  };
  return (
    <div className="navbar-landing">
      <button className="buttons-navs">INICIO</button>
      <div className="nav2">
        <button className="buttons-navs">Registrarme</button>
        <button className="buttons-navs" onClick={clickHandlerLogin}>
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default NavBarLanding;