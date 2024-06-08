const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section left">
          <h5>CONTACTANOS</h5>
          <div>
            <i className="bi bi-telephone-fill"></i> +54 2474181222
          </div>
          <div>
            <i className="bi bi-envelope"></i> materos@gmail.com
          </div>
          <div>
            <i className="bi bi-geo-alt-fill"></i> Zeballos 1341, Rosario
          </div>
        </div>
        <div className="footer-section center">
          <h5>OFERTAS Y PAGOS</h5>
          <div>
            <i className="bi bi-truck"></i> ENVIOS GRATIS A TODO EL PAIS
          </div>
          <div>
            <i className="bi bi-bag-check"></i> 3 CUOTAS SIN INTERES
          </div>
          <div>
            <i className="bi bi-award"></i> 6 MESES DE GARANTíA
          </div>
        </div>
        <div className="footer-section right">
          <h5>REDES SOCIALES</h5>
          <div>
            <i className="bi bi-instagram"></i> INSTAGRAM
          </div>
          <div>
            <i className="bi bi-facebook"></i> FACEBOOK
          </div>
          <div>
            <i className="bi bi-twitter-x"></i> TWITTER
          </div>
        </div>
      </footer>
      <div className="container-end-main">
        <p>© 2024. Términos y Condiciones.</p>
      </div>
    </>
  );
};

export default Footer;
