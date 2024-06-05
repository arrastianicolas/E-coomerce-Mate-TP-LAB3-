import NavBarLanding from "../../Navs/NavBarLanding";
import AboutWe from "../AboutWe/AboutWe";
import HandsL from "../Hands/HandsL";
import HandsR from "../Hands/HandsR";

import Carrousel from "./Carrousel";

const Landing = () => {
  return (
    <>
      <NavBarLanding />

      <div className="d-flex justify-content-between">
        <HandsL />

        <div className="principal">
          <button
            className="buttons-about"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          >
            <h1 className="Tittle-Landing">
              MUNDO <br /> MATERO
            </h1>
          </button>

          <div className="p-landing">
            <p>Conseguí los mejores mates, termos, bombillas y materas.</p>
          </div>
        </div>
        <HandsR />
      </div>

      <br />
      <br />
      <Carrousel />
      <AboutWe />
    </>
  );
};

export default Landing;
