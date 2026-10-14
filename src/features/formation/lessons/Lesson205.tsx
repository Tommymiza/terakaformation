import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson205() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c205.0")}</h3>
        <div className="card-descri">
          <h4>{t("c205.1")}</h4>
          <p>{t("c205.2")}</p>
        </div>
        <div className="card-descri">
          <h4>{t("c205.3")}</h4>
          <p>{t("c205.4")}</p>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c205.5")}</h3>
        <div className="row-content">
          <img src="/images/205/Young_plantors_003.jpg" alt="" />
          <Slider>
            <div>
              <h4>
                {t("c205.6")}{" "}
                <a href="https://rejoindre.teraka.org">rejoindre.teraka.org</a>
              </h4>
              <p>
                {t("c205.7")}{" "}
                <a href="https://programme.teraka.org">Programme</a>,{" "}
                <a href="https://rejoindre.teraka.org">rejoindre</a>
                {t("c205.8")}
              </p>
            </div>
            <div>
              <h4>{t("c205.9")}</h4>
              <p>{t("c205.10")}</p>
            </div>
            <div>
              <h4>{t("c205.11")}</h4>
              <p>{t("c205.12")}</p>
            </div>
            <div>
              <h4>{t("c205.13")}</h4>
              <p>{t("c205.14")}</p>
              <p>{t("c205.15")}</p>
              <p>{t("c205.16")}</p>
            </div>
            <div>
              <h4>{t("c205.17")}</h4>
              <p>{t("c205.18")}</p>
            </div>
            <div>
              <h4>{t("c205.19")}</h4>
              <p>{t("c205.20")}</p>
            </div>
            <div>
              <h4>{t("c205.21")}</h4>
              <p>{t("c205.22")}</p>
            </div>
            <div>
              <h4>{t("c205.23")}</h4>
              <p>{t("c205.24")}</p>
            </div>
          </Slider>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c205.25")}</h3>
        <div className="row-content">
          <div className="column-content w-full md:w-[42%]">
            <div className="card-descri">
              <p>{t("c205.26")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c205.27")}</h4>
              <p>{t("c205.28")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c205.29")}</h4>
              <p>{t("c205.30")}</p>
              <p>{t("c205.31")}</p>
              <p>{t("c205.32")}</p>
              <p>{t("c205.33")}</p>
            </div>
          </div>
          <div className="w-full md:w-[42%]">
            <img
              className="h-full w-full rounded-2xl object-cover"
              src="/images/205/IMG_0228.JPG"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
