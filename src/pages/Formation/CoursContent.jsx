import React from "react";
import { useParams, useLocation } from "react-router";

export default function CoursContent() {
  const { id } = useParams();
  const { state } = useLocation();
  const { item } = state;
  const title = ["Titre 1", "Titre 2", "Titre 3"];
  if (title.includes(id) && item) {
    return <div className="col-div" id="cours">
        <h1>{item.title + " " + item.id}</h1>
        <p>{item.description}</p>
        <div className="col-div" style={{gap: "50px", marginTop: "50px"}}>
        {item.content.map((sItem, index)=>(
            <div key={index} className="col-div">
                <h3>{sItem.sousTitre} dans {item.title + " " + item.id}</h3>
                <p>{sItem.content}</p>
            </div>
        ))}
        </div>
    </div>;
  }
  return <div style={{ marginTop: "250px" }}>Erreur 404</div>;
}
