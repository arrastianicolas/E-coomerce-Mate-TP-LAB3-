import Mate from "../../../assets/Mate.png";
import Termo from "../../../assets/termo.png";
import Bombilla from "../../../assets/Bombilla.png";
import useTraduction from "../../../custom/UseTraduction";

const Carrousel = () => {
  const { t } = useTraduction();

  return (
    <>
      <h2 className="tittle-carrousel">{t("carouselTitle")}</h2>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Mate}
              className="d-block w-100"
              alt="Mate 1"
              id="img-mate"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Termo}
              className="d-block w-100"
              alt="Termo"
              id="img-mate"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Bombilla}
              className="d-block w-100"
              alt="Mate 2"
              id="img-mate"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">{t("prev")}</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">{t("next")}</span>
        </button>
      </div>
    </>
  );
};

export default Carrousel;
