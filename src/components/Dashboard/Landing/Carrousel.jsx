import mate2 from "../../../assets/mate2.png";
import termo from "../../../assets/termo.png";
import termocarc from "../../../assets/termocentrall.png";

const Carrousel = () => {
  return (
    <>
      <h2 className="tittle-carrousel">¡NUESTROS PRODUCTOS MAS VENDIDOS!</h2>
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
              src={mate2}
              className="d-block w-100"
              alt="Mate 1"
              id="img-mate"
            />
          </div>
          <div className="carousel-item">
            <img
              src={termo}
              className="d-block w-100"
              alt="Termo"
              id="img-mate"
            />
          </div>
          <div className="carousel-item">
            <img
              src={termocarc}
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
          <span className="visually-hidden">Previous</span>
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
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carrousel;
