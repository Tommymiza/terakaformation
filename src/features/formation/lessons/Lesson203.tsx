import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson203() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c203.0")}</h3>
        <div className="article">
          <img src="/images/203/Carbonides-Carbone.png" alt="" />
          <div>
            <p>{t("c203.1")}</p>
            <p>{t("c203.2")}</p>
            <p>{t("c203.3")}</p>
            <p>{t("c203.4")}</p>
            <p>{t("c203.5")}</p>
            <p>{t("c203.6")}</p>
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c203.7")}</h3>
        <img
          className="w-full md:w-1/2"
          src="/images/203/cycle-carbone.jpg"
          alt=""
        />
        <div className="card-descri">
          <h4>{t("c203.8")}</h4>
          <p>{t("c203.9")}</p>
        </div>
        <div className="card-descri">
          <h4>{t("c203.10")}</h4>
          <p>{t("c203.11")}</p>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c203.12")}</h3>
        <Slider>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_1.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.13")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_2.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.14")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_3.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.15")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_4.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.16")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_5.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.17")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_6.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.18")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_7.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.19")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_8.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.20")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_9.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.21")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_10.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.22")}</p>
          </div>
          <div className="column-content">
            <img
              className="w-full md:w-1/2"
              src="/images/203/203_11.png"
              alt=""
            />
            <p className="font-semibold">{t("c203.23")}</p>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c203.24")}</h3>
        <div className="card-descri">
          <h4>{t("c203.25")}</h4>
          <p>{t("c203.26")}</p>
        </div>
        <div className="card-descri">
          <h4>{t("c203.27")}</h4>
          <p>{t("c203.28")}</p>
        </div>
        <div className="card-descri">
          <h4>{t("c203.29")}</h4>
          <p>{t("c203.30")}</p>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c203.31")}</h3>
        <div className="row-content">
          <div className="card h-60 sm:w-72">
            <img src="/images/203/CCfour-malgache.webp" alt="" />
            <div className="contenu">
              <h5>{t("c203.32")}</h5>
            </div>
          </div>
          <div className="card h-60 sm:w-72">
            <img src="/images/203/Photo_petite.jpg" alt="" />
            <div className="contenu">
              <h5>{t("c203.33")}</h5>
            </div>
          </div>
          <div className="card h-60 sm:w-72">
            <img
              src="/images/203/quand-epandre-le-fumier-de-cheval-dans-le-jardin.jpg"
              alt=""
            />
            <div className="contenu">
              <h5>{t("c203.34")}</h5>
              <p>{t("c203.35")}</p>
            </div>
          </div>
          <div className="card h-60 sm:w-72">
            <img src="/images/203/sante_1_0.jpg" alt="" />
            <div className="contenu">
              <h5>{t("c203.36")}</h5>
              <p>{t("c203.37")}</p>
            </div>
          </div>
          <div className="card h-60 sm:w-72">
            <img src="/images/203/iStock-1406909744.jpg" alt="" />
            <div className="contenu">
              <h5>{t("c203.38")}</h5>
              <p>{t("c203.39")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
