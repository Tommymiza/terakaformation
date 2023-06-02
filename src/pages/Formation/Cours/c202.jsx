import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { cours } from "../cours1";
import Test from "./Test202";

export default function C202() {
  const { id, sid } = useParams();
  const navigate = useNavigate();
  const { user, server, setAlert, setPath } = useContext(ActContext);
  const [rating, setRating] = useState(user.formation["202"]?.rating || 0);
  const [nb, setNb] = useState(
    user.formation["202"]?.progress !== 15 &&
      user.formation["202"]?.progress !== 85
      ? 0
      : user.formation["202"]?.progress === 15
      ? 1
      : 2 ?? 0
  );
  function updateDatabase() {
    axios({
      method: "POST",
      url: server + "/updateformation",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessKey"),
      },
      data: {
        id: user.id,
        formation: user.formation,
      },
    }).catch((err) => {
      setAlert({
        type: "error",
        message: err.response.data.error ?? "Erreur de connexion!",
      });
    });
  }
  function valider(n) {
    if (!user.formation["202"] || user.formation["202"].progress < n) {
      var temp = Object.create(user.formation["202"] ?? { progress: 0 });
      temp.progress = n;
      user.formation["202"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  function sendTest(){
    setAlert({
      type: "success",
      message: "Misaotra nanantontosa ny fanadinana",
    });
    navigate("/cours");
  }
  useEffect(() => {
    if (user.formation["202"]?.progress === 100) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    setPath(
      <>
        <Link to={"/cours"}>Mes cours</Link>
        <span>/</span>
        <Link to={`/cours/${id}`}>
          {id}. {cours[parseInt(id) - 1].titre}
        </Link>
        <span>/</span>
        <Link to={`/cours/${id}/${sid}`} className="active">
          {sid}. {cours[parseInt(id) - 1].liste[parseInt(sid) - 1].titre}
        </Link>
      </>
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 3) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    <>
      {nb === 0 && (
        <div className="content">
          <h3>Fampidirana momban’ny tombotsoa azo avy amin’ny fambolen-kazo</h3>
          <p>
            Tongasoa indray ianao. Teo aloha isika dia namelabelatra ny
            mahazavadehibe ny soatoavin’ny TERAKA. Eto indray isika dia hianatra
            momban’ny fambolen-kazo.
          </p>
          <p>
            Mitondra zava-tsoa be dia be hoanao ny fambolenkazo amin’ny maha
            tantsaha, hoan’ny fambolenao, hoan’ny vondrom-piarahamonina misy
            anao, zry indrindra hoan’ny tontolo iainana. Hianaranao ihany koa ny
            mamboly hazo miaraka amin’ny TERAKA. Satria ny hazon’ny TERAKA da
            afaka manome vola karbaona, saingy mbolq mila manaraka toromarika
            maromaro aloha vao afaka mandraharaha anatin’ilay sehatra karbaona.
          </p>
          <p>Mazotoa ary miofana.</p>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider(15)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 1 && (
        <div className="content">
          <h3>Ireo tombontsoa azo avy amin’ny fambolen-kazo</h3>
          <p>
            Ireto avy ary ireo tombontsoa azo avy amin’ny fambolen-kazo, toy ny
            fitsaboina, na ny fahatomombanan’ny tany
          </p>
          <p>Fa maninona no manan-danja ny fambolena hazo?</p>
          <div className="content-part">
            <h5>Manarina an’ireo toerana voatrandradraka ny fambolen-kazo</h5>
            <p>
              Ny ala dia fonenan'ny karazan-java-maniry sy biby isan-karazany,
              ary ny fambolena hazo dia manampy amin'ny fikolokoloina ny
              zava-mananaina.
            </p>
            <p>
              Ny fambolen-kazo dia miaro ny tany tsy hovoakaokan’ny riaka ary
              miaro amin’ny fihotsahan’ny tany
            </p>
            <p>
              Ny fakany hazo dia manampy amin'ny fanamafisana ny tany ary
              hampihenana ny riaka mikaoka azy amin’ny alalan’ny rivotra sy ny
              tondra-drano. Ny fambolen-kazo any an-tendrombohitra dia mampihena
              ny mety hisian'ny fihotsahan'ny tany.
            </p>
          </div>
          <p>
            Manatsara ny kalitaon'ny tany manodidina azy ireo ny hazo, manampy
            ny fambolena ho tsara vokatra amin’ny alalan’ny fitambaran’ny voly
            sy ny ala ary ny fiompiana (agroforesterie)
          </p>
          <p>
            Miaraka amin’io agroforesterie io, dia maniry miaraka amin’ny voly
            sy ny sahan’arakandro ny hazo. Ny ravina latsaka avy amin'ny hazo
            dia manampy amin'ny fanatsarana ny tany amin'ny alàlan'ny
            fampidirana otrikaina toy ny azota.
          </p>
          <div className="content-part">
            <h5>
              Ny hazo dia manome voankazo sy voanjo izay azo anampiana ny
              fidiram-bola sy ny fomba fisakafoanana{" "}
            </h5>
            <p>
              Karazan-javamaniry maro no mamoa voankazo, toy ny zavoka sy manga,
              na voanjo, toy ny macadamia. Ireo dia azo amidy soamantsara na
              ihany koa azo atao sakafo hoan’ny fianakaviana.
            </p>
          </div>
          <p>
            Amin'ny faritra somary mandrivotra dia azo ambolena manodidina ny
            trano na karazana fanorenana ny hazo mba ho fiarovana amin’ny
            fifofon’ny rivotra.
          </p>
          <p>
            Ireo hazo manko dia miaro ny tany tsy ho very be loatra amin’ny
            alalan’ny fitsiokan’ny rivotra. Rehefa mamboly manodidina ny trano
            na karazana fanorenana ireo hazo, dia afaka miaro azo ireo sy miaro
            ny fanahazan-damba.
          </p>
          <p>Ny hazo sasany dia manome fanafody.</p>
          <p>
            Ny hazo dia manome hazo amin’ny fanganana trano ohatra, angovo ary
            tsato-kazo
          </p>
          <p>
            Raha araky ny fampiharana tsara an’ny TERAKA, ny hazo dia azo
            otazana amin’ny fomba maharitra eny fa na dia hampiasaina amin’ny
            fiompiana aza.
          </p>
          <div className="content-part">
            <h5>
              Ny fambolen-kazo dia mampisy hatsarana ny endriky ny taninao
            </h5>
            <p>
              Tsy tombony ara-toekarena, ara-pambolena sy ara-tontolo iainana
              ihany ihany no azo avy amin’ny hazo fa manome fahafinaretana
              hoan’ny maso ihany koa izy!
            </p>
            <p>
              Manampy amin’ny ady atao amin’ny fiovaovan’ny toetr’andro ihany
              koa ny hazo
            </p>
            <p>
              Ny fiovaovan'ny toetr'andro dia mitarika ny haintany, tondra-drano
              ary rotsak’orana tsy ara-dalàna. Manatsara ny toetrandro ny hazo
              amin'ny alalan’ny fanesorana karbaona eny amin'ny habakabaka.
            </p>
          </div>
          <div className="content-part">
            <h5>Midika inona izany hoe mamboly hazo miaraka amin’ny TERAKA?</h5>
            <p>
              Ny mpikambana ao amin’ny TERAKA no misafidy ny hazo tiany
              hambolena. Ireo hazo avy ao an-toerana sy ireo hazo fihinam-boa
              dia tsaratsara kokoa.
            </p>
            <p>
              Kanefa rehefa mamboly haeo hoan’ny TERAKA dia misy fepetra tsy
              maintsy arahina.
            </p>
            <p>
              Voalohany aloha, ny hazo iray raha te ho tafiditra anatin’ny
              sokajin’ny hazon’ny TERAKA? Dia mila hambolena aorian’ny
              fanatevenan-daharana ny Fandaharan’asa TERAKA.
            </p>
            <p>
              Ireo hazo dia tsy maintsy manana halava mirefy 2 metatra
              farafahakeliny ary ireo tantsaha dia tsy maintsy manaiky ny
              hikolokolo ireo hazo ao anatin’ny 60 taona farafahakeliny. Ireo
              “hazo izay ho tapahina afaka 10 na 20 taona” na “hazo à courte
              rotation” dia tsy tafiditra anatin’ny hazon’ny TERAKA.
            </p>
          </div>
          <div className="image-center-row">
            <img
              src="/images/202_arbre_1.png"
              alt="202_arbre_1.png"
              style={{ objectFit: "contain" }}
            />
            <p>Tsy maintsy 2 metatra ny halavan’ny hazo farafahakeliny</p>
          </div>
          <div className="image-center-column">
            <img
              src="/images/202_arbre_2.png"
              alt="202_arbre_2.png"
              style={{ width: "100%", objectFit: "contain" }}
            />
            <div>
              <p>1 taona</p>
              <img
                src="/images/arrow.png"
                alt="arrow"
                style={{ width: "60%" }}
              />
              <p>60 taona</p>
            </div>
            <p>
              Ny tanin-janakazo dia tsy maintsy velona anatin’ny 60 taona
              farafahakeliny.
            </p>
          </div>
          <p>
            Ireo hazo tanora tsy mbola nahatratra 2 metatra dia afaka tafiditra
            ao anatin’ny hazon'ny TERAKA fa tsy afaka misehatra amin’ny vola
            karbaona fotsiny izy ireo. Saingy efa mahazo ilay fandoavana vola
            mialoha.
          </p>
          <p>
            Mila mielanelana 2 metatra ireo hazon’ny TERAKA. Mba ahafahan’ny
            hazo mitroka tsara ireo gazy, dia mila toerana malalaka be ny hazo
            mba ahafahany mitombo ara-dalàna.
          </p>
          <div className="image-center-column">
            <img
              src="/images/202_arbre_3.png"
              alt="202_arbre_3.png"
              style={{ width: "100%", objectFit: "contain" }}
            />
            <p>2 metatra</p>
            <p>
              Mila mielanelana 2 metatra ireo hazo mba hanana ny kalitao
              mendrika amin’ny vola karbaona.
            </p>
          </div>
          <p>
            Afaka mamboly hazo mielanelana latsaky ny 2 metatra ireo tantsaha
            toy ny hazon’angovo. Saingy tsy mahazo vola karbaona ireo hazo ireo
            amin’izay fotoana izay.
          </p>
          <p>
            Mila ambolena eo amin’ny taninao ireo hazo, na raha eo
            an-tanin’olona dia mila mahazo alalana avy amin’ny tompony.
          </p>
          <p>
            Na dia tsy an-tery aza izany, dia ampirisihana ireo tantsaha TERAKA
            anorina ny pepinierany mba hanampy amin’ny fambolena ny zana-kazo.
            Ireo zana-kazo ireo dia afaka ambolena sy ampiasaina mba
            hampidi-bola ihany koa.
          </p>
          <div className="action-center">
            <button className="nav-btn" onClick={() => setNb(nb - 1)}>
              Hiverina
            </button>
            <button className="nav-btn" onClick={() => valider(85)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 2 && (
        <div className="content">
          <h3>Famintinana: TERAKA sy ny fambolen-kazo</h3>
          <p>
            Vita soa izay! Azonao tsara izao ny votoanton’ny fambolen-kazo
            miaraka amin’ny TERAKA! Fotoana izao ny ampiharana sy
            anantanterahana izay nianarana! Afaka atombokao izany amin’ny
            alalan’ny fambolenkazo ao amin’ny TERAKA.
          </p>
          <p>
            Ny fizarana manaraka dia anome fahalalana bebe kokoa momban’ny
            fandraharahana amin’ny Kredi Karbaona. Mialohan’ny hanohizana
            amin’io fizarana io anefa dia manasa anao hamaly ireo fanontaniana
            mifanaraka amin’ity fiofanana ity.
          </p>
          <div className="action-center">
            <button className="nav-btn" onClick={() => setNb(nb - 1)}>
              Hiverina
            </button>
            <button className="nav-btn" onClick={() => valider(100)}>
              Tapitra
            </button>
          </div>
        </div>
      )}
      {nb === 3 && (
        <div className="content">
          <h3>Fanadinana momban'ny fambolena hazo TERAKA</h3>
          <Test />
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["202"].rating = n;
                updateDatabase();
                setRating(n);
              }}
            />
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => sendTest()}>
              Alefa
            </button>
          </div>
        </div>
      )}
    </>
  );
}
