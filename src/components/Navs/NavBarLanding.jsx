import { useNavigate } from "react-router-dom";

const NavBarLanding = () => {
  const navigate = useNavigate();
  
  const clickHandlerRegister = () => {
    navigate("/register");
  };
  
  const clickHandlerLogin = () => {
    navigate("/login");
  };

  const clickHandlerLanding = () => {
    navigate("/landing");
  };
  return (
    <div className="navbar-landing">
      <button className="buttons-navs" onClick={clickHandlerLanding}>INICIO</button>
      <div className="nav2">
        <button className="buttons-navs" onClick={clickHandlerRegister}>Registrarme</button>
        <button className="buttons-navs" onClick={clickHandlerLogin}>Iniciar Sesion</button>
      </div>
    </div>
  );
};

export default NavBarLanding;
