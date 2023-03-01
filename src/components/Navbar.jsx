import * as React from 'react';

export default function Navbar () {
  return (
      <header>
        <div id='logo'>
          <img src="logo.png" alt="Teraka logo" style={{width: 100}} onClick={()=> window.open("https://www.teraka.org", "_self")} />
        </div>
        <ul>
          <li title="Page d'accueil"><a href="https://www.teraka.org">Accueil</a></li>
          <li title="Le programme TERAKA"><a href="https://programme.teraka.org">Programme</a></li>
          <li title="Page des formations"><a href="https://formation.teraka.org">Formation</a></li>
        </ul>
      </header>
  );
}
