import { useTranslation } from "react-i18next";

export default function Lesson101() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("c101.0")}</h1>
      <div className="content-part">
        <h5>{t("c101.1")}</h5>
        <p>{t("c101.2")}</p>
        <div className="image-center-column mt-0">
          <img src="/images/101_1.png" width={"100%"} alt="nav" />
          <p>
            <i>{t("c101.3")}</i>
          </p>
        </div>
      </div>
      <div className="content-part">
        <h5>{t("c101.4")}</h5>
        <p>{t("c101.5")}</p>
        <div className="image-center-column mt-0">
          <img src="/images/101_3.png" width={"100%"} alt="nav" />
          <p>
            <i>{t("c101.6")}</i>
          </p>
        </div>
      </div>
      <div className="content-part">
        <h5>{t("c101.7")}</h5>
        <p>{t("c101.8")}</p>
        <div className="image-center-column mt-0">
          <img src="/images/101_2.png" width={"300px"} alt="nav" />
          <p>
            <i>{t("c101.9")}</i>
          </p>
        </div>
      </div>
      <div className="content-part">
        <h5>{t("c101.10")}</h5>
        <p>{t("c101.11")}</p>
        <div className="image-center-column mt-0">
          <img src="/images/101_15.png" width={"100%"} alt="nav" />
          <p>
            <i>{t("c101.12")}</i>
          </p>
        </div>
      </div>
    </>
  );
}
