import { HomeRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cours } from "../pages/Formation/cours1";

export default function Pathnav() {
  const [path, setPath] = useState([]);
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
