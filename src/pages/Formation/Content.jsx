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
import Pathnav from "../../components/Pathnav";

export default function Content() {
  const { id, sid } = useParams();
  console.log()
  const liste = [
    [<C101 />, <C102 />],
    [<C201 />, <C202 />, <C203 />, <C204 />, <C205 />, <C206 />, <C207 />],
  ];
  if (![1, 2].includes(parseInt(id))) {
    return <NotFound />;
  }
  if (parseInt(id) === 1 && ![1, 2].includes(parseInt(sid))) {
    return <NotFound />;
  }
  if (parseInt(id) === 2 && ![1, 2, 3, 4, 5, 6, 7].includes(parseInt(sid))) {
    return <NotFound />;
  }
  return <section>
    <Pathnav />
    {liste[parseInt(id) - 1][parseInt(sid) - 1]}
  </section>;
}
