import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson206() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c206.0")}</h3>
        <div className="row-content">
          <div className="w-full md:w-[42%]">
            <img
              className="w-full rounded-2xl object-contain"
              src="/images/206/IMG_1389.jpeg"
              alt=""
            />
          </div>
          <div className="card-descri w-full md:w-1/2">
            <h4>{t("c206.1")}</h4>
            <p>{t("c206.2")}</p>
            <p>{t("c206.3")}</p>
            <p>{t("c206.4")}</p>
            <p>{t("c206.5")}</p>
          </div>
        </div>
        <div className="row-content">
          <div className="card-descri w-full md:w-1/2">
            <h4>{t("c206.6")}</h4>
            <p>{t("c206.7")}</p>
            <p>{t("c206.8")}</p>
            <p>{t("c206.9")}</p>
            <p>{t("c206.10")}</p>
          </div>
          <div className="w-full md:w-[42%]">
            <img
              className="w-full rounded-2xl object-contain"
              src="/images/206/XWOVEIJ4O7D45ESQMCSDJPCOF4.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c206.11")}</h3>
        <Slider autoPlay interval={2000}>
          <div className="column-content">
            <img
              className="h-64 object-contain"
              src="/images/206/206_1.png"
              alt=""
            />
            <p>{t("c206.12")}</p>
            <h4>{t("c206.13")}</h4>
          </div>
          <div className="column-content">
            <img
              className="h-64 object-contain"
              src="/images/206/206_2.png"
              alt=""
            />
            <p>{t("c206.14")}</p>
            <h4>{t("c206.15")}</h4>
          </div>
          <div className="column-content">
            <img
              className="h-64 object-contain"
              src="/images/206/206_3.png"
              alt=""
            />
            <p>{t("c206.16")}</p>
            <h4>{t("c206.17")}</h4>
          </div>
          <div className="column-content">
            <img
              className="h-64 object-contain"
              src="/images/206/206_4.png"
              alt=""
            />
            <p>{t("c206.18")}</p>
            <h4>{t("c206.19")}</h4>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c206.20")}</h3>
        <Slider autoPlay interval={2000}>
          <div className="column-content">
            <img
              src="/images/206/206_10.png"
              alt=""
              className="w-full object-contain md:w-1/2"
            />
            <p>{t("c206.21")}</p>
          </div>
          <div className="column-content">
            <img
              src="/images/206/206_11.png"
              alt=""
              className="w-full object-contain md:w-1/2"
            />
            <p>{t("c206.22")}</p>
          </div>
          <div className="column-content">
            <img
              src="/images/206/206_12.png"
              alt=""
              className="w-full object-contain md:w-1/2"
            />
            <p>{t("c206.23")}</p>
          </div>
          <div className="column-content">
            <img
              src="/images/206/206_13.png"
              alt=""
              className="w-full object-contain md:w-1/2"
            />
            <p>{t("c206.24")}</p>
          </div>
          <div className="column-content">
            <img
              src="/images/206/206_14.png"
              alt=""
              className="w-full object-contain md:w-1/2"
            />
            <p>{t("c206.25")}</p>
          </div>
        </Slider>
      </div>
    </>
  );
}
