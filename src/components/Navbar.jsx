import * as React from 'react';
import { AppBar, Box,  } from "@mui/material"

export default function Navbar () {
  return (
    <Box>
      <AppBar position='static' sx={{background: "#ccc", p: 2}} className="d-flex flex-row justify-content-between align-items-center">
        <div id='logo'>
          <img src="logo.png" alt="Teraka logo" style={{width: 100}} />
        </div>
        <ul className='navbar d-flex flex-row col-md-4 col-sm-6 justify-content-around align-items-center gap-3 m-0'>
          <li title="Page d'accueil"><a href="https://www.teraka.org">Accueil</a></li>
          <li title="Le programme TERAKA"><a href="https://programme.teraka.org">Programme</a></li>
          <li title="Page des formations"><a href="https://rejoindre.teraka.org">Rejoindre</a></li>
        </ul>
      </AppBar>
    </Box>
  );
}
