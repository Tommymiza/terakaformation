import React, { useEffect, createContext, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Formation from "./pages/Formation";
import Connexion from "./components/Connexion";
import Info from "./components/Info"

export const ActContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState();
  const server = "http://13.112.105.248:4422";
  useEffect(()=>{
    if(alert){
      setTimeout(()=>{
        setAlert(null)
      }, 3000);
    }
  }, [alert])
  useEffect(() => {
    if (localStorage.getItem("session")) {
      axios({
        url: server + "/getuser",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("session"),
        },
      })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="App">
      <header className="">
        <Navbar />
      </header>
      <ActContext.Provider value={{server, user, setUser, setAlert}}>
        <section>{user ? <Formation /> : <Connexion />}</section>
      </ActContext.Provider>
      {alert && <Info type={alert.type} message={alert.message} />}
    </div>
  );
}

export default App;
