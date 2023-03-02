import React, { useEffect, createContext, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import Formation from "./pages/Formation";
import Info from "./components/Info"
import { CircularProgress } from "@mui/material";
import Formulaire from "./components/Formulaire";

export const ActContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const server = "https://api.teraka.org";
  useEffect(()=>{
    if(alert){
      setTimeout(()=>{
        setAlert(null)
      }, 3000);
    }
  }, [alert])
  useEffect(() => {
    // if (localStorage.getItem("session")) {
    //   axios({
    //     url: server + "/getuser",
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("session"),
    //     },
    //   })
    //     .then((res) => {
    //       if (res.data.user) {
    //         setUser(res.data.user);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     }).finally(()=>{
    //       setLoading(false);
    //     })
    // }else{
    //   setLoading(false)
    // }
  }, []);
  return (
    <div className="App">
      <header className="">
        <Navbar />
      </header>
      <ActContext.Provider value={{server, user, setUser, setAlert}}>
        {loading ? (
          <div className="loading">
            <CircularProgress size={150} />
          </div>
        ) : (
          <section>{user ? <Formation /> : <Formulaire />}</section>
        )}
      </ActContext.Provider>
      {alert && <Info type={alert.type} message={alert.message} />}
    </div>
  );
}

export default App;
