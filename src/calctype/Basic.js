import "../css/Basic.css";
import React, { useState, useEffect } from "react";
import NumInput from "../components/NumInput";
import Error from "../components/Error";
import SliderInput from "../components/SliderInput";
const Basic = () => {
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
  const [total, setTotal] = useState({
    VG: 0,
    PG: 0,
    aroma: 0,
    ice: 0,
    nicotine: 0,
  });
  const [pricePerMl, setPricePerMl] = useState({
    VG: 0,
    PG: 0,
    aroma: 0,
    ice: 0,
    nicotine: 0,
    additional: 0,
    profit_perc: 0,
  });

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

    setTotal({
      ...total,
      VG: Math.round(VG * pricePerMl.VG * 100) / 100,
      PG: Math.round(PG * pricePerMl.PG * 100) / 100,
      aroma: Math.round(aroma * pricePerMl.aroma * 100) / 100,
      ice: Math.round(ice * pricePerMl.ice * 100) / 100,
      nicotine: Math.round(nicotine.ml * pricePerMl.nicotine * 100) / 100,
    });

    // console.log(t_nicotine_PG);
    // console.log(t_nicotine_VG);
  }, [
    desired.ml,
    nicotine.VG,
    nicotine.PG,
    nicotine.nic_base_mg_ml,
    pricePerMl,
  ]);

  return (
    <div className="App">
      <div className="card">
        <section className="mixing">
          <section className="liquid">
            <h2>E-Liquid base</h2>
            <NumInput
              label="Desired e-liquid amount"
              placeholder={30}
              onChange={(e) => {
                setDesired({
                  ...desired,
                  ml: parseFloat(e.target.value),
                });
              }}
              unit="ml"
            />
            <SliderInput
              label="Desired VG/PG ratio"
              onChange={(e) => {
                setDesired({
                  ...desired,
                  VG: parseFloat(e.target.value),
                  PG: parseFloat(100 - e.target.value),
                });
              }}
              step="10"
              min="10"
              max="90"
              unit={desired.VG + "/" + desired.PG}
            />
          </section>

          <section className="aroma">
            <h2>Aroma</h2>
            <NumInput
              label="Desired aroma strength"
              placeholder={12}
              onChange={(e) => {
                setDesired({
                  ...desired,
                  aroma: parseFloat(e.target.value),
                });
              }}
              unit="%"
            />
          </section>

          <section className="ice">
            <h2>Ice</h2>
            <NumInput
              label="Desired ice strength"
              placeholder={2}
              onChange={(e) => {
                setDesired({
                  ...desired,
                  ice: parseFloat(e.target.value),
                });
              }}
              unit="%"
            />
          </section>

          <section className="nicotine">
            <h2>Nicotine</h2>
            <NumInput
              label="Desired nicotine strength"
              placeholder={8}
              onChange={(e) => {
                setDesired({
                  ...desired,
                  nicotine: parseFloat(e.target.value),
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
                  nic_base_mg_ml: parseFloat(e.target.value),
                });
              }}
              unit="mg/ml"
            />
            <SliderInput
              label="Nicotine base VG/PG ratio"
              onChange={(e) => {
                setNicotine({
                  ...nicotine,
                  VG: parseFloat(e.target.value),
                  PG: 100 - parseFloat(e.target.value),
                });
              }}
              step="10"
              min="10"
              max="90"
              unit={nicotine.VG + "/" + nicotine.PG}
            />
          </section>
        </section>

        <section className="calculations_container">
          <section className="pricing">
            <h2>Set prices per ml</h2>
            <NumInput
              label="PG"
              placeholder={0.19}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  PG: parseFloat(e.target.value),
                });
              }}
              unit="$/ml"
            />
            <NumInput
              label="VG"
              placeholder={0.08}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  VG: parseFloat(e.target.value),
                });
              }}
              unit="$/ml"
            />
            <NumInput
              label="Aroma"
              placeholder={10}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  aroma: parseFloat(e.target.value),
                });
              }}
              unit="$/ml"
            />
            <NumInput
              label="Ice"
              placeholder={10}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  ice: parseFloat(e.target.value),
                });
              }}
              unit="$/ml"
            />
            <NumInput
              label="Nicotine"
              placeholder={3}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  nicotine: parseFloat(e.target.value),
                });
              }}
              unit="$/ml"
            />
            <NumInput
              label="Additional costs"
              placeholder={10}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  additional: parseFloat(e.target.value),
                });
              }}
              unit="$"
            />
            <NumInput
              label="Profit margin"
              placeholder={10}
              onChange={(e) => {
                setPricePerMl({
                  ...pricePerMl,
                  profit_perc: parseFloat(e.target.value),
                });
              }}
              unit="%"
            />
          </section>
          <section className="calculations">
            <h2>Final results</h2>
            <table>
              <tr>
                <th></th>
                <th>
                  <p>PG</p>
                </th>
                <th>
                  <p>VG</p>
                </th>
                <th>
                  <p>Ice</p>
                </th>
                <th>
                  <p>Aroma</p>
                </th>
                <th>
                  <p>Nicotine</p>
                </th>
                <th>
                  <p>Total</p>
                </th>
              </tr>
              <tr>
                <td>
                  <p>ml:</p>
                </td>
                {PG < 0 ? <td class="error">{PG}</td> : <td>{PG}</td>}
                {VG < 0 ? <td class="error">{VG}</td> : <td>{VG}</td>}
                {ice < 0 ? <td class="error">{ice}</td> : <td>{ice}</td>}
                {aroma < 0 ? <td class="error">{aroma}</td> : <td>{aroma}</td>}
                <td>{nicotine.ml}</td>
                <td>{desired.ml}</td>
              </tr>
              <tr>
                <td>
                  <p>Price:</p>
                </td>
                <td>{total.PG}</td>
                <td>{total.VG}</td>
                <td>{total.ice}</td>
                <td>{total.aroma}</td>
                <td>{total.nicotine}</td>
                <td>
                  {(total.PG +
                    total.VG +
                    total.ice +
                    total.aroma +
                    total.nicotine +
                    pricePerMl.additional) *
                    (pricePerMl.profit_perc
                      ? pricePerMl.profit_perc / 100 + 1
                      : 1)}
                </td>
              </tr>
            </table>
            <h2>
              Profit:{" "}
              {Math.round(
                ((total.PG +
                  total.VG +
                  total.ice +
                  total.aroma +
                  total.nicotine +
                  pricePerMl.additional) *
                  (pricePerMl.profit_perc
                    ? pricePerMl.profit_perc / 100 + 1
                    : 1) -
                  (total.PG +
                    total.VG +
                    total.ice +
                    total.aroma +
                    total.nicotine +
                    pricePerMl.additional)) *
                  100
              ) / 100}
              $
            </h2>
          </section>

          <section className="errors">
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
          </section>
        </section>
      </div>
    </div>
  );
};
export default Basic;
