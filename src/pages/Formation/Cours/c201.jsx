import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { cours } from "../cours1";

export default function C201() {
  const { id, sid } = useParams();
  const navigate = useNavigate();
  const { user, server, setAlert, setPath } = useContext(ActContext);
  const page = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(user.formation["201"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user.formation["201"]?.progress * page.length) / 100) &&
      (user.formation["201"]?.progress * page.length) / 100 !== 5
      ? (user.formation["201"]?.progress * page.length) / 100
      : 0
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
        message: err.response.data.error || "Erreur de connexion!",
      });
    });
  }
  function valider(nb) {
    if (
      !user.formation["201"] ||
      user.formation["201"].progress < (nb + 1) * 20
    ) {
      var temp = Object.create(user.formation["201"] ?? { progress: 0 });
      temp.progress += 20;
      user.formation["201"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user.formation["201"]?.progress * page.length) / 100 === 5) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    setPath(
      <>
        <Link to={"/cours"}>
          Mes cours
        </Link>
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
    if (nb === 5) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    <>
      {nb === 0 && (
        <div className="content">
          <h3>Iza ary izany TERAKA izany?</h3>
          <p>
            TERAKA dia tantsaha mirotsaka an-tsitrapo hiditra ao amin'ny
            vondrom-piarahamonin’ny TERAKA. Tia fanabeazana izy ireo, tia
            mandrato fahalalana momba ny fiompiana amam-pambolena, ary tia
            mikolokolo ny tontolo iainana. Maro ireo tantsahan’ny TERAKA izay
            monina any amin'ny faritra maina, izay mijaly noho ny faharipahan’ny
            ala, ny fahapotehan'ny tany, ny hain-tany ary ny tsy
            fahampian-tsakafo. Ny TERAKA dia ahitana Vondrona Madinika.
            Miara-miasa izahay hamolavola fampiharana tsara sy hanatsara ny
            fambolena amam-piompiana ary ny tontolo iainanay.
          </p>
          <p>
            Amin’ny alalan’ny fambolenkazo, dia mahazo kitay fandrehitra ny
            tantsahan’ny TERAKA, mahazo hazo amin’ny fanorenana fotodrafitr’asa,
            mahazo voankazo sy voa ary zava-maniry mitondra fitsaboana.
            Manatsara ny tany mandrakariva ny fambolenkazo, miaro ny fambolena
            amin’ny tundra-drano, manatsaran’ny rano fisotron’ny mponina, ary
            miady amin’ny fiovaovan’ny toetr’andro.
          </p>
          <p>
            Miankina amin’ny tahan’ny gazy karbaonika izay notrohan’ny hazo
            voavolin’ny tantsahan’ny TERAKA teny amin’ny atmosfera ny vola
            miditra ao amin’izy ireo. Ny Clean Air Action Cooperation no
            mandrefy amin’ny fomba mazava sy mangarahara an’io tahan’ny karbaona
            anaty hazo io, mba ahafahan’ireo tantsaha miditra amin’ny tsenan’ny
            karbaona maneran-tany.
          </p>
          <p>
            Rehefa miara-miasa ny Vondrona Madinika dia mahavita zavatra be.
            Raha to aka Vondrona Madinika aman’arivony no miara-miasa mba
            hanatsara ny famboleny sy ny vondrom-piarahamonina misy azy, dia
            afaka manampy nan’izao tontolo izao izy ireo. Manaraka ny
            soatoavin’ny TERAKA avokoa ireo mpikambana ao aminy. Hojerentsika
            manaraka ireo soatoavina ireo.
          </p>
          <h3>TERAKA VALUES</h3>
          <p>
            TERAKA dia vondron'ireo tantsaha niara-niasa mba hanatsarana ny
            fiainan'ny fianakaviany, ny vondrom-piarahamonina misy azy ary ny
            planeta. Tantsaha maherin’ny 130.000 no mikolokolo hazo velona
            manodidina ny 23 tapitr’isa any India, Kenya, Tanzanie ary Uganda.
          </p>
          <p>
            Ny soatoavin’ny teraka dia tena manan-danja be amin’ny
            fahatafitan’ny tetik’asa
          </p>
          <ul style={{ marginLeft: "20px" }}>
            <li>Mandeha amin’ny rariny izahay.</li>
            <li>Manao zavatra mazava tsara izahay.</li>
            <li>Mangarahara izahay.</li>
            <li>Izahay dia tompon'andraikitra.</li>
            <li>Izahay dia mifampitondra ami-pifanompoana.</li>
            <li>Mpilatsaka an-tsitra-po izahay.</li>
            <li>
              Mikajy vokatra lehibe miaraka amin’ny teti-bola mora izahay.
            </li>
          </ul>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 1 && (
        <div className="content">
          <h3>Inona no mampiavaka azy?</h3>
          <p>Mpilatsaka antsitra-po izahay</p>
          <p>
            Manantevin-daharana ny TERAKA ireo tan-tsaha noho ny
            vondrom-piarahamonina, ny fanabeazana, ny fitomboan'ny fahalalana
            momba ny fambolena ary ny fandraharahana momban’ny ny karbaona.
          </p>
          <p>Mamolavola sy mampiasa fampiharana tsara izahay</p>
          <p>
            Ny tantsaha TERAKA dia mamolavola sy mizara fampahalalana momba ny
            fambolena maharitra, momban’ny ala, ny fahasalamana, ny resaka
            sakafo mahavelona ary ireo hetsika amin’ny fampandrosoana
            lovian-jafy. Izahay dia mizara ireo fampiharana tsara amin'ireo
            Vondrona Madinika rehetra.
          </p>
          <p>Izahay ihany no manao ny asa ao amin'ny Vondrona Madinika</p>
          <p>
            Ireo Vondrona Madinika no fototry ny programa TERAKA. Miisa 6
            katramin’ny 12 ireo tantsaha anaty vondrona iray ary mivory
            isan-kerinandro mba hizara ireo fampiharana tsara, mba hifanohana
            ary hifampitantana.
          </p>
          <p>Mampiasa ny lohantsika sy ny tanantsika isika</p>
          <p>
            Haintsika hoe ahoana ny fiasana mafy miaraka amin’ny loha sy ny
            tanantsika. Ny fanoloran-tenantsika amin'ny soatoavin’ny TERAKA dia
            midika fa manao zavatra tsara amin’ny tokony ho izy isika fa tsy
            amin’ny fomba mora.
          </p>
          <div className="action-center">
            <button className="nav-btn" onClick={() => setNb(nb - 1)}>
              Hiverina
            </button>
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 2 && (
        <div className="content">
          <h3>Inona no ataontsika?</h3>
          <p>
            Manantevin-daharana ny TERAKA ny tantsaha ary mandrafitra Vondrona
            Madinika misy olona 6 katramin’ny 12 mba hamboly hazo manodidina ny
            tranony, ny toeram-pamboleny, ny renirano, ny sekoly, ny lalana ary
            ny fiangonana. Manome alokaloka ny hazo, mampihena ny fikaohan’ny
            riaka, manatsara ny tany ary mandrisika ny fitomboan'ny kirihitra sy
            ahitra. Ny hazo koa dia mamokatra voankazo sy voanjo, fanafody,
            sakafom-biby fiompy toy ny omby, kitay ary fitaovana fananganana.
          </p>
          <p>
            Rehefa mihalehibe ny hazo dia mampihena ny gazy karbaonika amin'ny
            rivotra ny photosynthèse amin'ny alàlan'ny fitahirizana azy ao anaty
            hazo, ny fakany ary ny tany. Ny mpiara-miasa aminay, Clean Air
            Action Corporation ( iTERAKA ), dia manao izay rehetra azo atao mba
            hamadika ity karbaona ity ho kredi karbaona ary avy eo mivarotra azy
            eny amin'ny tsenan'ny karbaona. Ny tantsahan’ny TERAKA kosa dia
            mahazo fiomanana isan-taona ary hahazo 70% ny tombom-barotra amin'ny
            fivarotana ny kredi karbaona.
          </p>
          <p>
            Mampiofana mpitarika ihany koa izahay. Amin'ny alàlan'ny
            “fifandimbiasan’ny fitarihina ”, ny tantsaha TERAKA rehetra dia
            mianatra mitarika ny Vondrona Madinika ananany. Ny tantsaha TERAKA
            sasany dia misafidy ny hampiofanina ho Kilasitera Mpanampy izay tena
            manisa sy manara-maso tsara ny fitomboan'ny hazo tsirairay ka ny
            kajy iTERAKA ny fahazoan-dàlana karbaona dia rariny sy mazava. Ireo
            valiny ireo dia ao amin'ny tranokalan'ny www.teraka.org mba
            hahitan'ny olona manerana an'izao tontolo izao ny hetsika
            ataontsika.
          </p>
          <div className="content-part">
            <h5>Mizara fampiharana tsara</h5>
            <p>
              Mamolavola sy mizara fomba fanao tsara indrindra momba ny
              fambolena maharitra, ny ala, ny fahasalamana ( ao anatin'izany ny
              VIH / SIDA ), ary ny hetsika amin’ny fampandrosoana lovain-jafy.
              Ny tantsaha TERAKA dia mizara ireo fampiharana tsara amin'ireo
              vondrona madinika rehetra. Manana fampitam-baovao, fivorian’ny
              kilasitera isam-bolana isika, ary Seminera isam-paritra izay
              mizara ny fampiharana tsara novolavolainay.
            </p>
          </div>
          <h3>Inona avy no ataonay?</h3>
          <p>
            Izahay dia mamboly karazana hazo samihafa mba hamoronana tontolo
            iainana tsara kokoa
          </p>
          <p>
            Mahita fomba hanatsarana ny sakafo ara-pahasalamana sy ny
            fahasalamantsika isika
          </p>
          <p>
            Izahay dia manao ny fambolena maharitra amin'ny fanatsarana ny
            toeram-piompiana sy ny fampitomboana ny vokatra azo.
          </p>
          <p>
            Izahay ihany koa dia mikajy tetikasa hafa hanatsarana ny fiainan’ny
            tantsaha sy ny vondrom-piarahamonina misy ny tantsaha toy ny
            fiompiana ny tantely sy ny fambolena holatra.
          </p>
          <p>
            Izahay dia mandrefy ny vokatry ny ezaka ataontsika hanatsarana ny
            tontolo iainana
          </p>
          <p>
            Mahazo vola avy amin'ny kredi Karbaona sy ny serivisy hafa momban’ny
            tontolo iainana izay ataon'ny tantsahan’nyTERAKA izahay
          </p>
          <div className="action-center">
            <button className="nav-btn" onClick={() => setNb(nb - 1)}>
              Hiverina
            </button>
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 3 && (
        <div className="content">
          <h3>Inona no foroninay? </h3>
          <div className="content-part">
            <h5>Misehatra amin’ny fandraharahana amin’ny karbaona izahay.</h5>
            <p>
              Mandraharaha ao amin’ny sehatry ny karbaona ny tantsahan’ny TERAKA
              mba hanohanana ny fianakaviany ary hanatsarana ny toeram-pambolena
              sy ny vondrom-piarahamonina misy azy ireo ary ny planeta.
            </p>
          </div>
          <div className="content-part">
            <h5>Mamorona kredi karbaona izahay.</h5>
            <p>
              Manome vola ny tenantsika sy ny ezaka ataontsika isika amin'ny
              fandrefesana tsara ny habetsaky ny gazy karbaonika teny amin’ny
              habakabaka notrohan’ny hazo izay nambolentsika eto amintsika.
            </p>
          </div>
          <div className="content-part">
            <h5>Mamorona fidiram-bola vaovao hoan’ny tokantrano isika.</h5>
            <p>
              Miara-miasa amin'ny iTERAKA mba handrefesana ny vokatra azontsika
              amin'ny fomba mazava sy mangarahara isika mba hahafahantsika
              miditra amin'ny tsenan'ny karbona manerantany.
            </p>
          </div>
          <div className="content-part">
            <h5>Mamorona vokatra lehibe isika.</h5>
            <p>
              Ny iTERAKA dia namolavola ary nanohy ny fanatsarana ny fomba
              hamoronana crédit karbaona ary handrefesana ny vokatra lehibe izay
              noforoninay amin'ny fanatsarana ny toeram-pambolena
            </p>
          </div>
          <div className="content-part">
            <h5>
              Mampiasa teti-bola mora izahay mba amoronana vokatra lehibe.
            </h5>
            <p>
              TERAKA sy iTERAKA dia niasa mafy nandritra ny 20 taona mahery mba
              hampihenana ny vidin'ny fandaharana mba hahafahan'ny vola
              karbonina bebe kokoa mankany amin'ny tantsaha TERAKA.
            </p>
          </div>
          <div className="content-part">
            <h5>Manangana vondrom-piarahamonina tantsaha izahay.</h5>
            <p>
              Tianay ny miara-miasa, mizara fampiharana tsara, ary ny manatsara
              ny toeram-pambolena sy ny fiaraha-monina ary ny tontolo iainana.
            </p>
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => setNb(nb - 1)}>
              Hiverina
            </button>
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 4 && (
        <div className="content">
          <h3>Fa maninona no manan-danja ny soatoavin'ny TERAKA?</h3>
          <div className="content-part">
            <h5>Mampisy fifampitokisana izahay.</h5>
            <p>
              TERAKA dia miasa miaraka amin’ireo azo itokisana ihany: mivarotra
              crédit karbaona, izay tsy hit any maso, tsy voakasiky ny tanana,
              ary tsy afaka andramana akory isika. Ny orinasa mividy ny kredi
              karbaona dia tsy maintsy matoky ny TERAKA, ary ny mpikambana ao
              amin’ny TERAKA dia tsy maintsy mifampatoky.
            </p>
          </div>
          <div className="content-part">
            <h5>Mifanampy mba ahazahoana tombony izy ireo</h5>
            <p>
              Ny soatoavina TERAKA dia manampy ny tantsaha hahazo valiny lehibe.
              Amin'ny alàlan'ny fiasa miaraka amin'ny teti-bola ambany izay
              miteraka valiny lehibe, dia mamorona vola karbonina bebe kokoa ho
              an'ny tantsaha TERAKA izahay.
            </p>
          </div>
          <div className="content-part">
            <h5>Avy amin’ny tantsaha, hoan’ny tantsaha.</h5>
            <p>
              TERAKA dia ataon'ireo tantsaha, ho an'ny tantsaha. Amin'ny
              fanarahana ny soatoavina TIST dia miara-miasa isika sy ny
              tenantsika. Ireo soatoavina ireo dia manohana ny fiaraha-monina sy
              ny fandraisana andraikitra.
            </p>
          </div>
          <div className="content-part">
            <h5>Mifanompo:</h5>
            <p>Ny soatoavin’ny TERAKA dia manampy anay hifanompo.</p>
          </div>
          <div className="action-center">
            <Rating
            value={rating}
              onChange={(e, n) => {
                user.formation["201"].rating = n;
                updateDatabase();
                setRating(n)
              }}
            />
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tapitra
            </button>
          </div>
        </div>
      )}
    </>
  );
}
