import NavBarLanding from "../../Navs/NavBarLanding";
import Footer from "../../footer/Footer";
import HandsL from "../Hands/HandsL";
import HandsR from "../Hands/HandsR";

import Carrousel from "./Carrousel";

const Landing = () => {
  return (
    <>
      <NavBarLanding />
      <div className="container-landing">
        <HandsL />
        <div className="principal">
          <h1 className="Tittle-Landing">
            MUNDO <br /> MATERO
          </h1>
          <div>
            <p className="p-landing">
              Conseguí los mejores mates, termos, bombillas y materas.
            </p>
          </div>
        </div>
        <HandsR />
      </div>
      <br />
      <br />
      <Carrousel />
      <Footer />
    </>
  );
};

export default Landing;
