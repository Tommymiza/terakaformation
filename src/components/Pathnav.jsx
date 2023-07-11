import { HomeRounded } from "@mui/icons-material";
import React, { useEffect, useState, useContext } from "react";
import { ActContext } from "../App";
import { NavLink, useLocation } from "react-router-dom";

export default function Pathnav() {
  const { t } = useContext(ActContext);
  const [path, setPath] = useState([]);
  const cours = [
    {
      titre: t("cours.0.titre"),
      descri: t("cours.0.descri"),
      liste: [
        {
          id: 101,
          titre: t("cours.0.liste.0.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 102,
          titre: t("cours.0.liste.1.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
      ],
    },
    {
      titre: t("cours.1.titre"),
      descri: t("cours.1.descri"),
      liste: [
        {
          id: 201,
          titre:  t("cours.1.liste.0.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 202,
          titre: t("cours.1.liste.1.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 203,
          titre: t("cours.1.liste.2.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 204,
          titre: t("cours.1.liste.3.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 205,
          titre: t("cours.1.liste.4.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 206,
          titre: t("cours.1.liste.5.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 207,
          titre: t("cours.1.liste.6.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
      ],
    },
  ];
  const location = useLocation();
  const roman = {
    "1": "I",
    "2": "II"
  }
  const title = (str, arr, i) => {
    if(arr[i - 1]?.titre === "cours"){
      return roman[str] + ". " + cours[parseInt(str) - 1].titre
    }
    if(arr[i - 2]?.titre === "cours"){
      return str + ". " + cours[parseInt(arr[i - 1].titre) - 1].liste[parseInt(str) - 1].titre
    }
    if(str.length > 30){
      return "";
    }
    return str === "" ? <HomeRounded sx={{fontSize: "25px"}}/> : str.replaceAll("%20", " ");
  };
  const createPath = (n, arr) => {
    var item_path = "";
    for (let i = 1; i <= n; i++) {
      item_path = item_path + "/" + arr[i];
    }
    return item_path;
  };

  useEffect(() => {
    const items_set = new Set([...location.pathname.split("/")]);
    const items = [...items_set];
    var temp_path = [];
    items.forEach((i, index) => {
      temp_path.push({
        titre: i,
        path: createPath(index, items),
      });
    });
    setPath(temp_path);
  }, [location]);
  return (
    <div id="pathnav">
      {path.length !== 0 &&
        path.map((item, index) => (
          <div key={item.path}>
            <NavLink to={item.path}>{title(item.titre, path, index)}</NavLink>
            {path[index + 1] ? <p>&nbsp;{"/"}&nbsp;</p> : ""}
          </div>
        ))}
    </div>
  );
}
