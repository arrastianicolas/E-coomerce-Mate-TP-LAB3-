const AboutWe = () => {
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">
              Sobre Nosotros
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body small">
            Bienvenidos a Mundo Matero, tu tienda en línea especializada en todo
            lo relacionado con el mate. Somos apasionados por esta tradición tan
            arraigada en nuestra cultura, y nos dedicamos a ofrecer los mejores
            productos para que disfrutes de un buen mate en cualquier momento y
            lugar.
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutWe;
