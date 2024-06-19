import NavBarLanding from "../../navs/NavBarLanding";
import Footer from "../../footer/Footer";
import AboutWe from "../aboutWe/AboutWe";
import HandsL from "../hands/HandsL";
import HandsR from "../hands/HandsR";

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

      <Footer />

      <AboutWe />
    </>
  );
};

export default Landing;
