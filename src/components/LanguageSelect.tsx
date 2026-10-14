import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { changeLanguage, LANGUAGES } from "@/lib/i18n";

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  return (
    <Select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      size="small"
      inputProps={{ "aria-label": "Langue" }}
      sx={{
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          py: "6px",
        },
      }}
    >
      {LANGUAGES.map((lang) => (
        <MenuItem
          key={lang.value}
          value={lang.value}
          sx={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <img src={lang.icon} alt="" className="w-5" />
          <span className="text-sm font-semibold">{lang.label}</span>
        </MenuItem>
      ))}
    </Select>
  );
}
