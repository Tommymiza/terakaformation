import React from "react";
import { motion } from "framer-motion";

export default function Accueil() {
  return (
    <>
      <div className="wrapper">
        <div className="parallax">
          <img
            src="/images/Women_group_cave_001.jpg"
            className="background"
            alt="background"
          />
          <motion.h1 initial={{opacity: 0, y: 200}} animate={{opacity: 1, y: 0, transition:{duration: 1}}}>Bienvenue sur Centre de formation Teraka</motion.h1>
        </div>
        <div className="content-div">
          <h3>Contenu:</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
            voluptas minima! Voluptatum ut repellat voluptates odit nobis eum
            alias accusantium distinctio, dolore doloremque, obcaecati ratione
            neque cum quaerat aut autem sequi vero saepe modi commodi qui nulla
            impedit dolor necessitatibus! Rem, quae error delectus voluptatum
            dolorem magnam ullam fugit, repellat alias repudiandae eligendi
            asperiores omnis sunt impedit corporis porro deserunt. Voluptatibus,
            consectetur eius ipsum eaque corporis, quis minima ab aspernatur
            aliquam iusto in consequuntur eos quidem est mollitia voluptas ut
            maiores tenetur quae aut expedita? Ea dolor officiis architecto
            labore tempora culpa, magni, dolorum facere minus sunt nostrum
            distinctio magnam modi, autem explicabo cupiditate eos neque in illo
            aspernatur repellendus voluptatibus quae dolore! Praesentium nostrum
            veritatis perferendis ipsa dicta, accusamus in maiores, veniam ullam
            consequuntur facere dolorem animi consequatur incidunt distinctio id
            tempora minus ut saepe excepturi sapiente impedit voluptatum
          </p>
        </div>
      </div>
    </>
  );
}
