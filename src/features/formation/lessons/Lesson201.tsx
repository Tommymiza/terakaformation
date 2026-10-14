import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson201() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c201.0")}</h3>
        <div className="row-content">
          <img src="/images/201/201_1.jpeg" alt="" />
          <div>
            <p>{t("c201.1")}</p>
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c201.2")}</h3>
        <div className="row-content justify-center">
          <div className="card">{t("c201.3")}</div>
          <div className="card">{t("c201.4")}</div>
          <div className="card">{t("c201.5")}</div>
          <div className="card">{t("c201.6")}</div>
          <div className="card">{t("c201.7")}</div>
          <div className="card">{t("c201.8")}</div>
          <div className="card">{t("c201.9")}</div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c201.10")}</h3>
        <div className="row-content">
          <img src="/images/201/201_2.JPG" alt="" />
          <div>
            <p>{t("c201.11")}</p>
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c201.12")}</h3>
        <Slider>
          <div className="row-content">
            <img src="/images/201/IMG_1354.jpeg" alt="" />
            <div>
              <h3>{t("c201.13")}</h3>
              <p>{t("c201.14")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/201/IMG_1280 2.jpeg" alt="" />
            <div>
              <h3>{t("c201.15")}</h3>
              <p>{t("c201.16")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/201/IMG_1696.JPG" alt="" />
            <div>
              <h3>{t("c201.17")}</h3>
              <p>{t("c201.18")}</p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c201.19")}</h3>
        <div className="row-content">
          <img src="/images/201/IMG_1509.JPG" alt="" />
          <Slider autoPlay interval={5000}>
            <div>
              <h3>{t("c201.20")}</h3>
              <p>{t("c201.21")}</p>
            </div>
            <div>
              <h3>{t("c201.22")}</h3>
              <p>{t("c201.23")}</p>
            </div>
            <div>
              <h3>{t("c201.24")}</h3>
              <p>{t("c201.25")}</p>
            </div>
            <div>
              <h3>{t("c201.26")}</h3>
              <p>{t("c201.27")}</p>
            </div>
          </Slider>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c201.28")}</h3>
        <div className="row-content">
          <div className="card-descri">
            <h4>{t("c201.29")}</h4>
            <p>{t("c201.30")}</p>
          </div>
          <div className="card-descri">
            <h4>{t("c201.31")}</h4>
            <p>{t("c201.32")}</p>
          </div>
          <div className="card-descri">
            <h4>{t("c201.33")}</h4>
            <p>{t("c201.34")}</p>
          </div>
          <div className="card-descri">
            <h4>{t("c201.35")}</h4>
            <p>{t("c201.36")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
