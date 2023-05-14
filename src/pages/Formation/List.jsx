import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function List() {
  const cours = [
    {
      id: 1,
      title: "Titre",
      description: "Description",
      content: [
        {
          sousTitre: "Sous-titre 1",
          content: "contenu 1",
        },
        {
          sousTitre: "Sous-titre 2",
          content: "contenu 2",
        },
        {
          sousTitre: "Sous-titre 3",
          content: "contenu 3",
        },
      ],
    },
    {
      id: 2,
      title: "Titre",
      description: "Description",
      content: [
        {
          sousTitre: "Sous-titre 1",
          content: "contenu 1",
        },
        {
          sousTitre: "Sous-titre 2",
          content: "contenu 2",
        },
        {
          sousTitre: "Sous-titre 3",
          content: "contenu 3",
        },
      ],
    },
    {
      id: 3,
      title: "Titre",
      description: "Description",
      content: [
        {
          sousTitre: "Sous-titre 1",
          content: "contenu 1",
        },
        {
          sousTitre: "Sous-titre 2",
          content: "contenu 2",
        },
        {
          sousTitre: "Sous-titre 3",
          content: "contenu 3",
        },
      ],
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <h1>Liste:</h1>
      <div className="grid">
        {cours.map((item) => (
          <motion.div
            className="card"
            key={item.id}
            initial={{ opacity: 0, y: 200 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.3 * item.id, type: "spring" },
            }}
            onClick={()=> navigate("/cours/"+item.title + " " + item.id, {state: {
              item
            }})}
          >
            <img src="/images/flower_superba_ajj.jpg" alt="illustration" />
            <div>
              <h3>{item.title + " " + item.id}</h3>
              <p>{item.description + " " + item.id}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
