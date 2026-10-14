import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

export default function Lesson204() {
  const { t } = useTranslation();
  return (
    <>
      <div className="column-content">
        <h3>{t("c204.0")}</h3>
        <div className="card-descri">
          <h4>{t("c204.1")}</h4>
          <p>{t("c204.2")}</p>
        </div>
        <div className="row-content">
          <img src="/images/203/IMG_1530.JPG" alt="" />
          <div>
            <p>{t("c204.3")}</p>
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.4")}</h3>
        <div className="row-content">
          <div className="column-content w-full md:w-[42%]">
            <p className="self-start">{t("c204.5")}</p>
            <div className="card-descri">
              <p>{t("c204.6")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.7")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.8")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.9")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.10")}</p>
            </div>
          </div>
          <div className="w-full md:w-[42%]">
            <img
              className="h-full w-full rounded-2xl object-cover"
              src="/images/204/IMG_1016.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.11")}</h3>
        <div className="row-content">
          <Tooltip title={t("c204.12")}>
            <div className="card">
              <p>{t("c204.13")}</p>
            </div>
          </Tooltip>
          <Tooltip title={t("c204.14")}>
            <div className="card">
              <p>{t("c204.15")}</p>
            </div>
          </Tooltip>
          <Tooltip title={t("c204.16")}>
            <div className="card">
              <p>{t("c204.17")}</p>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.18")}</h3>
        <div className="row-content">
          <div className="column-content w-full md:w-[42%]">
            <div className="card-descri">
              <p>{t("c204.19")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.20")}</p>
            </div>
          </div>
          <div className="w-full md:w-[42%]">
            <img
              className="h-full w-full rounded-2xl object-cover"
              src="/images/204/Three-part_cycle_diagram.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.21")}</h3>
        <div className="card-descri">
          <p>{t("c204.22")}</p>
        </div>
        <div className="card-descri">
          <p>{t("c204.23")}</p>
        </div>
        <div className="card-descri">
          <p>{t("c204.24")}</p>
        </div>
        <div className="card-descri">
          <p>{t("c204.25")}</p>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.26")}</h3>
        <Slider>
          <div className="row-content">
            <img src="/images/204/IMG_1271.jpeg" alt="" />
            <div>
              <h3>{t("c204.27")}</h3>
              <p>{t("c204.28")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/204/leader cluster.jpeg" alt="" />
            <div>
              <h3>{t("c204.29")}</h3>
              <p>{t("c204.30")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/204/Leader national.JPG" alt="" />
            <div>
              <h3>{t("c204.31")}</h3>
              <p>{t("c204.32")}</p>
            </div>
          </div>
          <div className="row-content">
            <img src="/images/204/record meeting.jpeg" alt="" />
            <div>
              <h3>{t("c204.33")}</h3>
              <p>{t("c204.34")}</p>
              <p>{t("c204.35")}</p>
              <p>{t("c204.36")}</p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="column-content">
        <h3>{t("c204.37")}</h3>
        <div className="row-content">
          <div className="column-content w-full md:w-[42%]">
            <div className="card-descri">
              <p>{t("c204.38")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c204.39")}</h4>
              <p>{t("c204.40")}</p>
              <ul className="ml-5 list-disc space-y-1">
                <li>{t("c204.41")}</li>
                <li>{t("c204.42")}</li>
                <li>{t("c204.43")}</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-[42%]">
            <img src="/images/204/webdiagram.png" alt="" />
          </div>
        </div>
      </div>
      <div className="column-content">
        <h3>{t("c204.44")}</h3>
        <div className="row-content">
          <div className="w-full md:w-1/2">
            <img
              className="h-full w-full rounded-2xl object-cover"
              src="/images/204/IMG_1379.JPG"
              alt=""
            />
          </div>
          <div className="column-content w-full md:w-[42%]">
            <p>{t("c204.45")}</p>
            <div className="card-descri">
              <p>{t("c204.46")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.47")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.48")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.49")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
