import React, { useContext, useState } from "react";
import { ActContext } from "../../../App";

export default function C101() {
  const { user } = useContext(ActContext);
  const page = [1, 2];
  const [nb, setNb] = useState(
    parseInt((user.formation["101"]?.progress * page.length) / 100) ?? 1
  );
  return (
    <>
      {nb === 1 && <div className="content"></div>}
      {nb === 2 && <div className="content"></div>}
      <div className="nav-cours"></div>
    </>
  );
}
