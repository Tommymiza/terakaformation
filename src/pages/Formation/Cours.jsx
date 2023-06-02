import React, { useContext, useEffect } from "react";
import List from "./List";
import Pathnav from "../../components/Pathnav";
import { ActContext } from "../../App";
import { Link } from "react-router-dom";

export default function Cours({ user }) {
  const { setPath } = useContext(ActContext);
  useEffect(()=>{
    setPath(
      <Link to={"/cours"} className="active">Mes cours</Link>
    )
  }, [])
  return (
    <section>
      {user ? (
        <>
          <Pathnav />
          <List />
        </>
      ) : (
        <div className="col-div" style={{ marginTop: "140px" }}>
          <h1>Vous devez vous connecter pour accéder au cours</h1>
        </div>
      )}
    </section>
  );
}
