import { useTranslation } from "react-i18next";

export default function Lesson102() {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t("c102.0")}</h3>
      <p>{t("c102.1")}</p>
      <p>{t("c102.2")}</p>
      <div className="image-center-column mt-0">
        <img className="w-full md:w-1/2" src="/images/102_1.png" alt="nav" />
        <p>
          <i>{t("c102.3")}</i>
        </p>
      </div>
    </>
  );
}
