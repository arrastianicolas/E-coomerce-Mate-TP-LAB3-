import { useTraduction } from "../../../custom/TraductionDictionary";

const AboutWe = () => {
  const { t } = useTraduction();

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
              {t("aboutUsTitle")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body small">{t("aboutUsContent")}</div>
        </div>
      </div>
    </>
  );
};

export default AboutWe;
