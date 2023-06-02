import React, { useContext } from "react";
import { ActContext } from "../App";

export default function Pathnav() {
  const { path } = useContext(ActContext);
  return (
    <div id="pathnav">
      {path ?? ""}
    </div>
  );
}
