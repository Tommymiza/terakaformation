import React from "react";
import { useParams } from "react-router";
import NotFound from "../../components/NotFound";
import C101 from "./Cours/c101";
import C102 from "./Cours/c102";
import C201 from "./Cours/c201";
import C202 from "./Cours/c202";
import C203 from "./Cours/c203";
import C204 from "./Cours/c204";
import C205 from "./Cours/c205";
import C206 from "./Cours/c206";
import C207 from "./Cours/c207";

export default function Content() {
  const { id, sid } = useParams();
  const liste = [
    [<C101 />, <C102 />],
    [<C201 />, <C202 />, <C203 />, <C204 />, <C205 />, <C206 />, <C207 />],
  ];
  if(liste[parseInt(id) - 1] && liste[parseInt(id) - 1][parseInt(sid) - 1]){
      return <div id="accueil">{liste[parseInt(id) - 1][parseInt(sid) - 1]}</div>;
  }
  return <NotFound />
}
