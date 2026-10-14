import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson202() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c202.0")}</h3>
        <Slider>
          <div className="row-content">
            <img src="/images/202/IMG_1310.jpeg" alt="" />
            <div>
              <h3>{t("c202.1")}</h3>
              <p>{t("c202.2")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/202/IMG_1312.jpeg" alt="" />
            <div>
              <h3>{t("c202.3")}</h3>
              <p>{t("c202.4")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/202/IMG_1033.jpeg" alt="" />
            <div>
              <h3>{t("c202.5")}</h3>
              <p>{t("c202.6")}</p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c202.7")}</h3>
        <Slider autoPlay interval={3000}>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/202/202_arbre_1.png"
              alt=""
            />
            <p className="font-semibold">{t("c202.8")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/202/202_arbre_2.png"
              alt=""
            />
            <p className="font-semibold">{t("c202.9")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/202/202_arbre_3.png"
              alt=""
            />
            <p className="font-semibold">{t("c202.10")}</p>
          </div>
        </Slider>
      </div>
      <div className="row-content">
        <div className="card-descri">
          <h4>{t("c202.11")}</h4>
          <p>{t("c202.12")}</p>
        </div>
      </div>
    </>
  );
}
