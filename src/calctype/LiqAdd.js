import "../css/LiqAdd.css";
import React, { useState, useEffect } from "react";
import NumInput from "../components/NumInput";
import Error from "../components/Error";
import SliderInput from "../components/SliderInput";
const LiqAdd = () => {
  const [desired, setDesired] = useState({
    ml: 0,
    VG: 50,
    PG: 50,
    nicotine: 0,
    aroma: 0,
    ice: 0,
  });
  const [ice, setIce] = useState(0);
  const [aroma, setAroma] = useState(0);
  const [nicotine, setNicotine] = useState({
    ml: 0,
    nic_base_mg_ml: 0,
    VG: 50,
    PG: 50,
    VG_ml: 0,
    PG_ml: 0,
  });
  const [VG, setVG] = useState(0);
  const [PG, setPG] = useState(0);

  useEffect(() => {
    if (isNaN(desired.ml)) {
      setDesired({ ...desired, ml: 0 });
    }

    let t_ice = desired.ml * (desired.ice / 100);
    if (
      desired.ice <= 0 ||
      isNaN(desired.ice) ||
      desired.ml <= 0 ||
      isNaN(desired.ml)
    ) {
      t_ice = 0;
    } else {
      t_ice = desired.ml * (desired.ice / 100);
    }

    let t_aroma = desired.ml * (desired.aroma / 100);
    if (isNaN(desired.aroma)) {
      t_aroma = 0;
    }

    let t_nicotine_ml = 0;
    let t_nicotine_VG = 0;
    let t_nicotine_PG = 0;
    if (
      desired.nicotine <= 0 ||
      isNaN(desired.nicotine) ||
      nicotine.nic_base_mg_ml <= 0 ||
      isNaN(nicotine.nic_base_mg_ml)
    ) {
      t_nicotine_ml = 0;
      t_nicotine_VG = 0;
      t_nicotine_PG = 0;
    } else {
      t_nicotine_ml = desired.nicotine / (nicotine.nic_base_mg_ml / desired.ml);
      t_nicotine_VG = t_nicotine_ml * (nicotine.VG / 100);
      t_nicotine_PG = t_nicotine_ml * (nicotine.PG / 100);
    }

    let t_bezVGPG = desired.ml - t_ice - t_aroma;
    // let t_des_VG_ml = t_bezVGPG * (desired.VG / 100) - t_nicotine_VG;
    // let t_des_PG_ml = t_bezVGPG * (desired.PG / 100) - t_nicotine_PG;
    setIce(Math.round(t_ice * 100) / 100);
    setAroma(Math.round(t_aroma * 100) / 100);
    setNicotine({
      ...nicotine,
      ml: Math.round(t_nicotine_ml * 100) / 100,
      VG_ml: t_nicotine_VG,
      PG_ml: t_nicotine_PG,
    });
    setVG(
      Math.round((t_bezVGPG * (desired.VG / 100) - t_nicotine_VG) * 100) / 100
    );
    setPG(
      Math.round((t_bezVGPG * (desired.PG / 100) - t_nicotine_PG) * 100) / 100
    );

    // console.log(t_nicotine_PG);
    // console.log(t_nicotine_VG);
  }, [desired, nicotine.VG, nicotine.PG, nicotine.nic_base_mg_ml]);

  return (
    <div className="App">
      <section className="section e-liquid">
        <NumInput
          label="Desired e-liquid amount"
          placeholder={30}
          onChange={(e) => {
            setDesired({
              ...desired,
              ml: parseInt(e.target.value),
            });
          }}
          unit="ml"
        />
        <SliderInput
          label="Desired VG/PG ratio"
          onChange={(e) => {
            setDesired({
              ...desired,
              VG: parseInt(e.target.value),
              PG: parseInt(100 - e.target.value),
            });
          }}
          step="10"
          min="10"
          max="90"
          unit={desired.VG + "/" + desired.PG}
        />
      </section>

      <hr />

      <section className="section aroma">
        <NumInput
          label="Desired aroma strength"
          placeholder={12}
          onChange={(e) => {
            setDesired({
              ...desired,
              aroma: parseInt(e.target.value),
            });
          }}
          unit="%"
        />
      </section>

      <hr />

      <section className="section ice">
        <NumInput
          label="Desired ice strength"
          placeholder={2}
          onChange={(e) => {
            setDesired({
              ...desired,
              ice: parseInt(e.target.value),
            });
          }}
          unit="%"
        />
      </section>

      <hr />

      <section className="section nicotine">
        <NumInput
          label="Desired nicotine strength"
          placeholder={8}
          onChange={(e) => {
            setDesired({
              ...desired,
              nicotine: parseInt(e.target.value),
            });
          }}
          unit="mg/ml"
        />
        <NumInput
          label="Nicotine base strength"
          placeholder={20}
          onChange={(e) => {
            setNicotine({
              ...nicotine,
              nic_base_mg_ml: parseInt(e.target.value),
            });
          }}
          unit="mg/ml"
        />
        <SliderInput
          label="Nicotine base VG/PG ratio"
          onChange={(e) => {
            setNicotine({
              ...nicotine,
              VG: parseInt(e.target.value),
              PG: 100 - parseInt(e.target.value),
            });
          }}
          step="10"
          min="10"
          max="90"
          unit={nicotine.VG + "/" + nicotine.PG}
        />
      </section>

      <hr />

      <section className="section calculations">
        <Error
          error={[
            nicotine.nic_base_mg_ml < desired.nicotine
              ? "Can't have more desired nicotine, than you have in your nicotine base"
              : null,
            nicotine.nic_base_mg_ml === desired.nicotine &&
            nicotine.nic_base_mg_ml !== 0
              ? "Please enter lower desired nicotine strength"
              : null,
            PG < 0 || VG < 0 ? "Please check the inputted data" : null,
          ]}
        />
        <p>PG: {PG < 0 ? <span class="error">{PG + "ml"}</span> : PG + "ml"}</p>
        <p>VG: {VG < 0 ? <span class="error">{VG + "ml"}</span> : VG + "ml"}</p>
        <p>
          Ice: {ice < 0 ? <span class="error">{ice + "ml"}</span> : ice + "ml"}
        </p>
        <p>
          Aroma:{" "}
          {aroma < 0 ? <span class="error">{aroma + "ml"}</span> : aroma + "ml"}
        </p>
        <p>Nicotine: {nicotine.ml}ml</p>
        <p>Total: {desired.ml}ml</p>
      </section>
    </div>
  );
};
export default LiqAdd;
