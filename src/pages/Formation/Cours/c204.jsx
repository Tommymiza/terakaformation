import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";

export default function C204() {
  const navigate = useNavigate();
  const { user, server, setAlert } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["204"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["204"]?.progress * 10) / 100) &&
      (user?.formation["204"]?.progress * 10) / 100 !== 10
      ? (user?.formation["204"]?.progress * 10) / 100
      : 0
  );
  function updateDatabase() {
    axios({
      method: "POST",
      url: server + "/updateformation",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
      !user.formation["204"] ||
      user.formation["204"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["204"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["204"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["204"]?.progress * 10) / 100 === 10) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 10) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <p>
              Amin'ity fiofanana ity dia hianatra momba ny rafitra TERAKA sy ny
              antony maha-zava-dehibe ny Vondrona madinika amin'ny TERAKA ianao.
            </p>
            <p>
              Tongasoa indray! Amin'ity fiofanana ity dia hianatra momba ny
              Vondrona Madinika an’I TERAKA sy ny fomba hifandraisan'ny Vondrona
              Madinika amin'ny Programa TERAKA ianao. Ireo Vondrona Madinika
              an’I TERAKA dia anisan’ny manan-danja indrindra amin'ity
              fandaharan’asa ity. Tokony hieritreritra tsara ianao alohan'ny
              hanangananao an’ity Vondrona Madinika ity satria hiara-hiasa
              amin'ireo mpikambana hafa ireo ianao mandritra ny 60 taona
              (faharetan’ny fifanarahana EMH izany)! Ny mpikambana ao amin'ny
              Vondrona Madinik’I TERAKA dia mifampizara vaovao amin'ny tsirairay
              sy ny Vondrona Madinika hafa, mifampitana andraikitra ary
              mamolavola ireo fampiharana tsara an’i TERAKA vaovao.
            </p>
            <h3>Inona ny atao hoe Vondrona Madinika an’i TERAKA?</h3>
            <p>
              Ny Vondrona Madinina an’i TERAKA dia ahitana mpikambana 6 ka
              hatramin’ny 12 izay avy amin'ny fianakaviana 3 farafahakeliny ary
              samy mifanakaiky trano.
            </p>
            <h3>Ahoana no ananganana Vondrona Madinika matanjaka?</h3>
            <p>
              Mila manana Vondrona Madinika ianao raha te hiditra ao amin’ny
              fianakaviam-ben’ny TERAKA. Mila fieritreretana tsara ny
              fananganana Vondrona Mandinika. Ny Vondrona Madinika dia ahitana
              namana sy mpifanolo-bodirindrina, ary ahafahan'ny mpikambana
              TERAKA hamptombo ny trai-kefa amin'ny maha-mpitarika azy izany. Ny
              Vondrona Madinika TERAKA manara-penitra dia misy olona miasa mafy
              ary mametraka ny Soatoavin’ny TERAKA. Matetika ny lehilahy sy ny
              vehivavy ao amin'ny Vondrona Madinika iray no mahavita be
              indrindra.
            </p>
            <h3>Ny fampanantenana’ny Vondrona Madinik’I TERAKA</h3>
            <p>
              Raha toa ka manantevindanharana ao amin’ny TERAKA ny Vondrona
              Madinika iray, dia manaiky an’izao ny mpikambana ao aminy:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Manolo-tena hamboly hazo 1000 farafahakeliny isan-taona
                mandritra ny 5 taona{" "}
              </li>
              <li>Mihaona in-1 isan-kerinandro farafahakeliny </li>
              <li>Manao sonian’ny fifanarahana EMH</li>
              <li>Mampihatra ny soatoavin’ny TERAKA</li>
              <li>
                Mampihatra ny fifandimbiasan’ny fitarihina sy ny fifanorenana
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
            <p>
              Ny Vondrona Madiniky TERAKA dia manamora ny fizarana vaovao sy ny
              fampivelarana ny fahaiza-mitarika. Ireto avy ny tombontsoa azo avy
              amin’ny Vondrona Madinika:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Ny lehilahy sy ny vehivavy ao amin'ny Vondrona Madinika iray
                ihany matetika no mahavita be indrindra.
              </li>
              <li>
                Ny Vondrona madinika dia manampy ny mpikambana ao aminy
                hifampitondra andraikitra. Rehefa tafita ny olona iray dia
                tafita avokoa ny vondrona iray manontolo. Raha misy manao ratsy
                dia voaratra avokoa ny vondrona
              </li>
              <li>
                Ny Vondrona Madinika dia manampy ny mpikambana
                hifampi-tantsoroka sy hifampizara sy traikefa
              </li>
              <li>
                Ny Vondrona Madinika dia olona avy amin’ny fianakaviana 3 samy
                hafa farafahakeliny mba hahafahan’ny olona manana fahafahana
                hitarika, hihaona amin’olona vaovao ary handray lesona amin’ireo
                olona vaovao ireo
              </li>
              <li>
                Hiaraka hananatatra vokatra lehibe avy amin’ny teti-bola tsy
                lafo ny Vondrona Madinika miaramiasa
              </li>
              <li>
                Ny Vondrona Madinika dia foba iray hampiroboroboana ny
                haitarika.
              </li>
            </ul>
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
            <h3>Anjara asam-pitarihan’ny Vondrona Madinika</h3>
            <p>
              Ao anatin’ny Vondrona Madinik’I TERAKA dia misy anjara
              asam-pitarihina karazany 3:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mpitarika - ny Mpitarika dia mitarika am-mpanompoana ny Vondrona
                Madinika, mitarika ny fivoriana ary manao izay ahafahan'ny
                tsirairay mandray anjara.
              </li>
              <li>
                Mpiara-mitarika - Ny mpiara-mitarika na mpitarika mpanampy dia
                manampy amin'ny fitarihana ny Vondrona Madinika ary manampy
                amin’ny fikajiana fotoana. Ny Mpitarika mpanampy no lasa
                Mpitarika amin’ny fivoriana manaraka
              </li>
              <li>
                Olona tompon’andraikitra - Mampahatsiahy ny Vondrona Madinika ny
                andraikiny sy ny fanoloran-tenany teo aloha sy ankehitriny ny
                olona tompon’nadraikitra. Izy io dia lasa mpitarika mpanampy
                amin’ny fivoriana manaraka.
              </li>
            </ul>
            <h3>Fifandimbiasan’ny fitarihina</h3>
            <p>
              Ny fifandimbiasan’ny fitarihina dia anisan’ny fampiharana
              tsaran’ny TERAKA ho an'ny vondrona madinika. Mifandimby isaky ny
              fivoriana (isan-kerinandro) ny fitarihana, ka ny Mpitarika
              mpanampy no lasa Mpitarika, ny Tompon'andraikitra lasa Mpitarika
              mpanampy, ary ny olona tompon'andraikitra vaovao no hofidiana.
            </p>
            <p>
              Ny fitarihana dia mifandimby eo amin'ny lehilahy sy ny vehivavy
              isaky ny ambaratongan'ny TERAKA. Midika izany fa raha lehilahy ny
              olona tompon'andraikitra amin'izao fotoana izao dia tokony ho
              vehivavy ny manaraka. Araka izany dia mifandimby hatrany ny
              fitarihana ny lehilahy sy ny vehivavy.
            </p>
            <h3>Tombontsoa azo avy amin’ny fifandimbiasan’ny fitarihina</h3>
            <p>
              Ireto ary ny karazan-tombontsoa azo avy amin’ny fifandimbiasan’ny
              fitarihana:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Ny olona tsirairay dia manana fahafahana hitarika am-panompoana.
              </li>
              <li>
                Samy manana ny fanomezam-pahasoavana atolotra ny olona
                tsirairay. Tsy fantatsika foana hoe inona izy ireo raha tsy
                nomena fahafahana isika
              </li>
              <li>Misy fahafahana mitovy ho an'ny lehilahy sy ny vehivavy.</li>
              <li>
                Ny fifandimbiasan’ny fitarihina dia mamporisika ny olona vaovao
                sy ireo izay saro-kenatra hahay hitarika
              </li>
              <li>
                Afaka manolo-tena amin'ny maha-mpitarika ny olona na dia mbola
                tsy manolo-tena amin'ny fitarihana mandritra ny taona maro aza.
              </li>
              <li>
                Mifampianatra momba ny maha-mpitarika tsara avy amin’ny
                tsirairay isika.
              </li>
              <li>
                Ny fifandimbiasan’ny fitarihina dia manome antoka fa misy
                hevitra vaovao sy karazana fitarihana vaovao ampiasaina isaky ny
                Vondrona Madinika.
              </li>
            </ul>
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
            <h3>Anjara asan’ny Mpitarika</h3>
            <p>
              Ny Mpitarika ao amin’ny Vondrona MadinikyTERAKA dia manana ireto
              andraikitra manaraka ireto:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Manompo ny Vondrona Madinika iray manontolo</li>
              <li>Manaraka ny Soatoavin’ny TERAKA</li>
              <li>
                Mandrindra ny fivorian’ny Vondrona Madinika sy mandrindra ny
                fandaharam-potoanan’ny fivoriana
              </li>
              <li>Manentana ny Vondrona Madinika</li>
              <li>
                Miara-miasa amin’ny Mpitarika mpanampy sy ny tompon’andraikitra
              </li>
              <li>Mandray sy mampafantatra ireo mpitsidika izay mety hoavy</li>
              <li>
                Mampita ny fifandraisana rehetra avy amin’ny Kilasiteran’ny
                TERAKA eo an-toerana
              </li>
              <li>
                Mampahatsiahy ny mpikambana ao amin’ny Vondrona madinika amin’ny
                fivoriana manaraka
              </li>
              <li>
                Mitantana ny fifidianana izay ho tompon’andraikitra vaovao
              </li>
            </ul>
            <p>
              Manaraka izany, idia hianaranao ny momban’ny anjara asan’ny
              mpiara-mitarika
            </p>
            <h3>Anjara asan’ny mpitarika mpanampy na ny mpiara-mitarika</h3>
            <p>
              Ny mpitarika mpanampin’ny Vondrona Madinika ny TERAKA dia manana
              ireto andraikitra manaraka ireto:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mitarika ny fivoriana raha to aka tsy tonga ilay mpitarika
              </li>
              <li>Mikajy hatrany ny fotoana mandritra ny fivoriana</li>
              <li>
                Mandray antsoratra ireo fivoriana sy ny fifanakalozan-kevitra
                atao ao
              </li>
              <li>Mamaky ny fivoriana natao teo aloha</li>
              <li>
                Manampy amin’ny fampiofanana ny olona tompon’andraikitra vaovao
              </li>
            </ul>
            <p>
              Manaraka, dia hianaranao ny anjara asan’ny olona
              tompon’andraikitra
            </p>
            <h3>anjara asan’ny olona tompon’andraikitra</h3>
            <p>
              Ny olona tompon’nandraikitra ao amin’ny Vondrona Madinika TERAKA
              dia manana ireto andraikitra ireto:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mitahiry ny firaketana ny Vondrona Kely toy ny naoty tamin'ny
                fivoriana teo aloha sy ny antontan-taratasy hafa izay tian'ny
                Vondrona madinika ho voaaro.
              </li>
              <li>Manohana ny Mpitarika sy mpiara-mitarika</li>
              <li>Mampiofana ny olona tompon'andraikitra manaraka </li>
              <li>Manampy amin'ny fifandraisana amin'ny kilasitera</li>
            </ul>
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
            <h3>Inona ny Kujengana?</h3>
            <p>
              Ny Kujengana dia teny Soahily izay midika “fifanorenana”, ary
              zavatra tsy maintsy atao isaky ny avy mivory ny Vondrona Madinika.
            </p>
            <h4>Ahoana ny fampiharana ny Kujengana?</h4>
            <p>
              Mialoha ny vavaka famaranana, ny mpikambana ao amin'ny Vondrona
              Madinika dia milaza zavatra iray manokana sy tsara izay nataon'ny
              Mpitarika nandritra ny fivoriana. Ireo fanehoan-kevitra ireo dia
              tokony ho voafaritra tsara ary manondro zavatra nataon’ny
              Mpitarika na nolazaina. Dinio tsara izany zavatra izany. Tsy
              tokony ho fanehoan-kevitra ankapobe toy ny hoe "nanao asa tsara ny
              Mpitarika". Tokony ho fanehoan-kevitra manokana toy ny hoe "ny
              Mpitarika dia nitana fotoana, nitsiky, ary namporisika ny
              mpikambana ao amin’ny Vondrona Madinika rehetra hiteny.
            </p>
            <p>
              Ny mpikambana ao amin'ny Vondrona Madinika tsirairay dia tokony
              hilaza zavatra hafa.
            </p>
            <p>
              Ny tsirairay dia manome Kujengana ho an'ny Mpitarika. Ny vondrona
              sasany koa dia manome Kujengana ho an'ny mpiara-mitarika.Ho
              setrin'ny Kujengana dia miteny fotsiny ny Mpitarika hoe
              "Misaotra." Tsy misy resaka momba ny fomba azo nantao mba
              hahatsara an’ilay zavatra natao anefa.
            </p>
            <p>
              Miaraka amin'ny fifandimbiasan’ny fitarihina, ny tsirairay dia
              mahazo ny fahafahana manome sy mandray Kujengana.
            </p>
            <h3>Fa maninona no mampihatra ny Kujengana?</h3>
            <p>
              Samy manana ny mampiavaka azy amin’ny talenta sy ny
              fanomezam-pahasoavana ny mpikamban’ny TERAKA tsirairay ary manana
              zavatra manan-danja ho fandraisana anajara amin’izany. Kujengana
              dia fampiharana ny filazana ny lanjan-javatra iray ho ren’ny olona
              rehetra. Toy ny fifandimbiasan’ny fitarihana, ny Kujengana dia
              zava-dehibe amin’ny fampiroboroboana ny haitarika ao amin’ny
              TERAKA.
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
        {nb === 5 && (
          <div className="content">
            <h3>Tombontsoan’ny Kujengana </h3>
            <p>
              Manome zava-tsoa maro be hoan’ny rehetra ny Kujengana ao amin’ny
              TERAKA:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Manome fahafalim-po hoan’ny mpitarika izany rehefa nahatontosa
                zavatra tsara izy
              </li>
              <li>
                Manampy ny mpitarika manaraka izany amin’ny fomba itondrany ny
                fivoriana manaraka
              </li>
              <li>Mampirisika ny olona ho lasa mpitarika ny Kujengana</li>
              <li>
                Manampy ny olona handinika ny maha tsar any fitarihina izany
              </li>
              <li>
                Mandray anjara amin’ny fivoriana avokoa ny mpikambana amin’ny
                Kujengana
              </li>
              <li>
                Ny Kujengana dia zava-dehibe amin’ny fampiroboroboana ny
                mpitarika ao amin’ny TERAKA
              </li>
              <li>
                Ny Kujengana dia manampy ny olona hizaha sy hanome vahana ny
                fahatsaran’ny olona
              </li>
            </ul>
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
        {nb === 6 && (
          <div className="content">
            <h3>Kilasiteran’ny TERAKA </h3>
            <p>
              Ny Vondrona Madinika tsirairay avy dia ao anatin’ny Kilasiteran’ny
              Vondrona Madinika. Ny kilasitera iray dia misy Vondrona Madinika
              30 hatramin’ny 50 izay tsy dia mifanalavitra toeram-ponenana.
            </p>
            <h4>Ahoana no fomba ananganana Kilasitera?</h4>
            <p>
              Ny Kilasitera tsirairay avy dia tokony manana Vondrona Madinika 30
              katramin’ny 50 isa, izay:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mamboly hazo 200.000 isa farafahakeliny(izany hoe, mamboly hazo
                1.000 isa-taona isam-bondrona)
              </li>
              <li>Manana pepiniera sy mikirakira zana-kazo</li>
              <li>Manana tany eo amin’ny 80 – 100 hektara eo hambolena hazo</li>
            </ul>
            <h4>Fivorian’ny Kilasitera</h4>
            <p>
              Mandefa solon-tena 2 (lahy iray sy vavy iray) any amin’ny
              fivorian’ny kilasitera isam-bolana ny Vondrona Madinikan’ny
              TERAKA. Misy agent kilasitera mandrindra an’ireo fivoriana ireo
              ary kendrena mba atao any amin’ny toerana mora hit any fihaonana.
              Mandritran’ny fivoriana, ny Tantsahan’ny TERAKA dia:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mahazo taratasim-pilazam-baobao isam-bolana, ary ataony tonga
                any amin’ny Vondrona Madinika misy azy io
              </li>
              <li>Mahazo tapakila fandoavana ny fambolena nokolokoloiny</li>
              <li>
                Mizara fampiharana tsara sy vaovao amin’ny mpikambana ao amin’ny
                Vondrona Madinika misy azy
              </li>
              <li>Mahazo fanampim-piofanana</li>
            </ul>
            <p>
              Manana anjara mitovy amin’ny Vondrona Madinika ny kilasitera:
              mpitarika – mpitarika mpanampy – olona tompon’andraikitra
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
        {nb === 7 && (
          <div className="content">
            <h3>Anjara asam-pitarihan’ny Kilasitera</h3>
            <p>
              Ny vondrona ihany koa dia tarihin'ny Mpitarika, Mpitarika
              mpiara-mitantana, ary olona tompon'andraikitra izay mampihatra ny
              fitarihana mihodinkodina. Na izany aza, ny Clusters dia manodina
              ny Leadership isaky ny 4 volana. Midika izany fa ny mpikambana
              tsirairay ao amin'ny Cluster dia hanana 12 volana amin'ny
              fanompoana (4 volana ho tompon'andraikitra, 4 volana ho
              mpiara-mitarika, ary 4 volana ho mpitarika ny Cluster).
            </p>

            <p>
              Tahaka ny ao amin'ny Vondrona Madinidinika TERAKA, ny vehivavy sy
              ny lehilahy dia mifandimby. Ary indray, toy ny ao amin'ny Vondrona
              Madinidinika TERAKA, rehefa mamarana ny fe-potoam-piasany ny
              Mpitarika Cluster dia ny Mpitarika mpiara-mitantana no Mpitarika
              vaovao, ny Mpitarika ny Tamberin'andraikitra no lasa Mpitarika
              mpiara-miombon'antoka vaovao, ary olom-baovao no voafidy.
            </p>
            <p>
              Ny Mpitarika Kilasitera, Mpitarika mpanampy, ary ny olona
              tompon’andraikitra dia manana andraikitra mitovy amin'ny ao
              amin'ny Vondrona madinikan’i TERAKA. Manana andraikitra fanampiny
              koa izy ireo:
            </p>
            <h4>Kilasitera Mpitarika</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mandrindra ny fanisana sy fanofanana ho an'ny Vondrona madinika{" "}
              </li>
              <li>Manampy ny kilasitera mba hiray fo sy saina </li>
              <li>Mamporisika ny fampiharana ny fambolena maharitra</li>
              <li>
                Miara-miasa amin'ny tompon'andraikitra mba hahazoana antoka fa
                misy tatitra isam-bolana sy tatitra mombany kaonty dia
                voatatitra ara-dalàna any any amin'ny Mpitarika an’ny TERAKA{" "}
              </li>
              <li>
                Manampy amin'ny fandraisana olona vaovao hiditra ho mpikambana
                ao amin’ny TERAKA
              </li>
              <li>
                Manampy ny Vondrona Madinika mba hahazo, hanasonia ary
                hampiditra ny fifanarahana momba ny Entona Mangeja Hafanana.
              </li>
              <li>
                Momban’ny fandoavam-bola kosa, dia mikarakara ny tapakila sy
                fitaovana hafa alohan'ny fivoriana Kilasitera izy ireo.
                Miaraha-miasa amin'ny olona tompon'andraikitra sy ny kilasitera
                mba hahazoana antoka fa ara-dalàna tsara ny fomba fandoavam-bola
                ary apetrao amin’ny mpitarikan’ny TERAKA sy ny mpandrindra ny
                fanontaniana rehetra manitikitika anao sy ny olana sedrainao.
              </li>
            </ul>
            <h4>Kilasitera Mpitarika Mpanampy</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>Manampy ny Mpitarika Kilasitera arak’izay azo atao</li>
              <li>
                Mikirakira ny fitanana antsoratra ny fivoriana sy ny tahiry
                nampiasaina mba amoronana ny Tatitran’ny Kilasitera
              </li>
            </ul>
            <h4>Olona Tompon’andraikitra Kilasitera</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mitahiry ny Cluster Records voalamina ao anaty Cluster Record
                Book.
              </li>
              <li>
                Mamela ny fisavana ny tahirim-pivoriana ho an'ireo mpikambana ao
                amin'ny kilasitera sy ny mpitarika TERAKA
              </li>
              <li>
                Mandefa tatitra isam-bolana amin'ny kilasitera amin'ny
                mpitarikan’ny TERAKA.
              </li>
              <li>
                Mandritra ny fandoavam-bola dia manome tapakila ho an'ny
                Vondrona Madinikan’ny TERAKA misy mpikambana roa manatrika.
                manamarina ny tapakila, mifandray amin'ny mpiandraikitra ny
                fandoavam-bola, ary manaraka ny fizotran'ny fandoavam-bola
                amin'ny fomba mazava sy mahitsy.
              </li>
            </ul>
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
        {nb === 8 && (
          <div className="content">
            <h3>Tombotsoan’ny Kilasitera </h3>
            <p>
              Misy tombotsoa maro be azo avy amin’ny rafitry ny Vondrona
              Madinika sy ny Kilasitera:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Manampy ny tantsahan’ny TERAKA hanangana vokatra lehibe amin’ny
                teti-bola ambany ny Kilasitera mba ahazahoan’ny tantsaha tombony
                maro amin’ny kredi karbaona
              </li>
              <li>
                Manampy ireo tantsahan’ny TERAKA hianatra momba ireo fanamby sy
                fahombiazana eo an-toerana ny vondrona ary mizara ny fampiharana
                tsaran’ny TERAKA.
              </li>
              <li>
                Ny Kilasitera dia manampy ny Vondrona madinika hifampiresaka
                mora foana
              </li>
              <li>
                Ny Kilasitera Mpanampin’ny TERAKA dia afaka mampiofana ny
                Mpambolin’ny TERAKA maro indray mandeha, ary avy eo dia hamerina
                izany fiofanana izany any amin'ny Vondrona madinika.
              </li>
              <li>
                Ny fivorian'ny Kilasitera dia manome fomba mahomby
                handoavam-bolan’ny tantsahan’ny TERAKA.
              </li>
            </ul>
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
        {nb === 9 && (
          <div className="content">
            <h3>Famintinana</h3>
            <p>
              Misaotra anao nandray anjara tamin’ity fiofanana ity. Ny fiofanana
              manaraka dia ho itanao ny fomba fananganana Vondrona Madinika ao
              amin’ny TERAKA.
            </p>
            <p>
              Raha toa ka manaraka ny fiofanana anatin’ny Vondrona Madinika
              ianao, dia aza adino ny mampihatra ny Fampiharana tsaran’ny
              Vondrona Madinika: manana mpitarika, mpitarika mpanampy, ary olona
              tompon’nandraikitra. Ary aza adino ny mampihatra ny Kujengana!
            </p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["204"].rating = n;
                  updateDatabase();
                  setRating(n);
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
    )
  );
}
