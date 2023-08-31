import React, { useState } from "react";
import i18n from "i18next";
import { MenuItem, Select, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const Lang = () => {
  const [ln, setLn] = useState(localStorage.getItem("lang") ?? i18n.language);
  const lang = [
    {
      value: "en-EN",
      label: "EN",
      icon: "/images/royaume-uni.png",
    },
    {
      value: "fr-FR",
      label: "FR",
      icon: "/images/france.png",
    },
    {
      value: "mg-MG",
      label: "MG",
      icon: "/images/madagascar.png",
    },
  ];
  const handleChange = (e) => {
    setLn(e.target.value)
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Select
          value={ln}
          onChange={handleChange}
          sx={{
            width: "90px",
            "&>div": { display: "flex", flexDirection: "row", gap: "5px", padding: "8px" },
          }}
        >
          {lang.map((item) => (
            <MenuItem
              key={item.label}
              value={item.value}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <img src={item.icon} alt={item.label} style={{ width: "25px" }} />
              <h4>{item.label}</h4>
            </MenuItem>
          ))}
        </Select>
      </ThemeProvider>
    </div>
  );
};

export default Lang;
