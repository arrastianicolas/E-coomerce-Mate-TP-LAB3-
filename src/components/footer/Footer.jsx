import useTraduction from "../../custom/UseTraduction";

const Footer = () => {
  const { t } = useTraduction();

  return (
    <>
      <footer className="footer">
        <div className="footer-section left">
          <h5>{t("contact")}</h5>
          <div>
            <i className="bi bi-telephone-fill"></i> {t("phone")}
          </div>
          <div>
            <i className="bi bi-envelope"></i> {t("email")}
          </div>
          <div>
            <i className="bi bi-geo-alt-fill"></i> {t("address")}
          </div>
        </div>
        <div className="footer-section center">
          <h5>{t("offersPayments")}</h5>
          <div>
            <i className="bi bi-truck"></i> {t("freeShipping")}
          </div>
          <div>
            <i className="bi bi-bag-check"></i> {t("installments")}
          </div>
          <div>
            <i className="bi bi-award"></i> {t("warranty")}
          </div>
        </div>
        <div className="footer-section right">
          <h5>{t("socialMedia")}</h5>
          <div>
            <i className="bi bi-instagram"></i> {t("instagram")}
          </div>
          <div>
            <i className="bi bi-facebook"></i> {t("facebook")}
          </div>
          <div>
            <i className="bi bi-twitter-x"></i> {t("twitter")}
          </div>
        </div>
      </footer>
      <div className="container-end-main">
        <p>{t("terms")}</p>
      </div>
    </>
  );
};

export default Footer;
