import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson207() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c207.0")}</h3>
        <Slider>
          <div className="row-content">
            <img src="/images/207/IMG_0231.JPG" alt="" />
            <div>
              <h4>{t("c207.1")}</h4>
              <p>{t("c207.2")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/207/P1100297.JPG" alt="" />
            <div>
              <h4>{t("c207.3")}</h4>
              <p>{t("c207.4")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/207/P1100319.JPG" alt="" />
            <div>
              <h4>{t("c207.5")}</h4>
              <p>{t("c207.6")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/207/case.JPG" alt="" />
            <div>
              <h4>{t("c207.7")}</h4>
              <p>{t("c207.8")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/207/paysage.jpeg" alt="" />
            <div>
              <h4>{t("c207.9")}</h4>
              <p>{t("c207.10")}</p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c207.11")}</h3>
        <div className="row-content">
          <div className="column-content w-full md:w-1/2">
            <div className="card-descri">
              <p>{t("c207.12")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.13")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.14")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.15")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.16")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.17")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.18")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.19")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c207.20")}</p>
            </div>
          </div>
          <div className="w-full md:w-[42%]">
            <img
              className="w-full rounded-2xl object-contain"
              src="/images/207/P1100127.JPG"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
