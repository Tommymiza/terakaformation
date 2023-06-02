import React from "react";
import "../../../styles/test.scss";

export default function Test() {
  return (
    <div id="test">
      <div>
        <h5>Ny agroforestria dia fomba fanao amin'ny: </h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst1"
            value={
              "Fambolena hazo eny anivon'ny voly sy kijana hanatsarana ny tany"
            }
          />
          <p>Fambolena hazo eny anivon'ny voly sy kijana hanatsarana ny tany</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst1"
            value={"Fambolena hazo ho alokaloka sy fitsokan'ny rivotra"}
          />
          <p>Fambolena hazo ho alokaloka sy fitsokan'ny rivotra</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst1"
            value={"Fambolena hazo fihinam-boa mba hampitomboana ny voly"}
          />
          <p>Fambolena hazo fihinam-boa mba hampitomboana ny voly</p>
        </div>
      </div>
      <div>
        <h5>
          Afaka mieritreritra tombontsoa hafa amin'ny fambolen-kazo ve ianao?
          Ahoana no nanatsaran'ny hazo ny toeram-pambolenao? Manasa anao hizara
          izay hevitra etsy ambany. Raha efa nanangana Vondrona Madinika ianao
          dia mifanakaloza hevitra amin'izy ireo
        </h5>
        <textarea name="qst2" placeholder="Valiny"></textarea>
      </div>
      <div>
        <h5>
          Azonao atao ve ny mamboly hazo amin'ny TERAKA? Manasa anao hizara ireo
          fanontaniana izay mbola manitikitika anao amin’ny fomba fambolena
          hazo. Raha efa manana Vondrona Madinika ianao, dia mifanakaloza
          hevitra amin’izy ireo.
        </h5>
        <textarea name="qst3" placeholder="Valiny"></textarea>
      </div>
      <div>
        <h5>
          Afaka mamboly hazo miaraka amin’ny TERAKA sy manaraka tsara ireo
          fepetra takiana amin’izany ve ianao sy ny Vondrona Madinika misy anao?
          Raha efa manana Vondrona Madinika ianao, dia mifanakaloza hevitra
          amin’izy ireo.
        </h5>
        <textarea name="qst4" placeholder="Valiny"></textarea>
      </div>
      <div>
        <h5>Tafiditra anatin’ny hazon’ny TERAKA ve ny Hazo "à courte rotation"?</h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst5"
            value={
              "Eny"
            }
          />
          <p>Eny</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst5"
            value={"Tsia"}
          />
          <p>Tsia</p>
        </div>
      </div>
      <div>
        <h5>Tokony mielanelana firy metatra ny hazon’ny TERAKA mba hahatafiditra azy anatin’ny Vola Karbaona?</h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst6"
            value={
              "1 metatra"
            }
          />
          <p>1 metatra</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst6"
            value={"2 metatra"}
          />
          <p>2 metatra</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst6"
            value={"3 metatra"}
          />
          <p>3 metatra</p>
        </div>
      </div>
      <div>
        <h5>Tokony ho firy metatra ny ahavon’ny hazon’ny TERAKA (farafahakeliny)?</h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst7"
            value={
              "1 metatra"
            }
          />
          <p>1 metatra</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst7"
            value={"2 metatra"}
          />
          <p>2 metatra</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst7"
            value={"Tsisy fepetra momban’ny halavan’ny hazo"}
          />
          <p>Tsisy fepetra momban’ny halavan’ny hazo</p>
        </div>
      </div>
      <div>
        <h5>Marina sa diso: Miady amin’ny fiovaovan’ny toetr’andro ny fambolen-kazo.</h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst8"
            value={
              "Marina"
            }
          />
          <p>Marina</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst8"
            value={"Diso"}
          />
          <p>Diso</p>
        </div>
      </div>
      <div>
        <h5>Inona no trohan’ny hazo eny amin’ny habakabaka ?</h5>
        <div className="radio-test">
          <input
            type="radio"
            name="qst9"
            value={
              "Oksizenina"
            }
          />
          <p>Oksizenina</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst9"
            value={"Gazy karbaonika"}
          />
          <p>Gazy karbaonika</p>
        </div>
        <div className="radio-test">
          <input
            type="radio"
            name="qst9"
            value={"Plomb"}
          />
          <p>Plomb</p>
        </div>
      </div>
    </div>
  );
}
