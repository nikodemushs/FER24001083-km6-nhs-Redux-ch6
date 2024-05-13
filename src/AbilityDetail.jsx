import { useEffect } from "react";
import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getItemDetail } from "./redux/actions/dataAction";
import { useDispatch, useSelector } from "react-redux";

const AbilityDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dname = useSelector((state) => state.data2.dname);
  console.log("dname :>> ", dname);
  const abilities = useSelector((state) => state.data2.abilities);
  const abilityDetail = Object.values(abilities).find(
    (ability) => ability.dname === dname
  );
  console.log("abilityDetail :>> ", abilityDetail);

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply  h-full min-h-screen"
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div class=" flex flex-col rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/60 ">
          <div className="flex container mx-auto text-white">
            <div className="flex flex-1 items-center space-y-1 ">
              <div className=" flex items-start">
                <img
                  src={`https://cdn.cloudflare.steamstatic.com${abilityDetail?.img}`}
                  className="w-auto h-64 rounded-lg flex-shrink-0 "
                  alt={abilityDetail?.dname}
                />
              </div>
              <div className="pl-5 space-y-1 ">
                <div className="text-3xl font-semibold ">
                  {abilityDetail?.dname}
                </div>
                <div className="text font ">{abilityDetail?.lore}</div>
                {abilityDetail?.behavior && (
                  <div className="text font ">
                    Ability : {""}{" "}
                    {Array.isArray(abilityDetail?.behavior)
                      ? abilityDetail?.behavior.join(", ")
                      : abilityDetail?.behavior}
                  </div>
                )}
                {abilityDetail?.target_team && (
                  <div className="text font ">
                    Affects : {abilityDetail?.target_team}
                  </div>
                )}
                {abilityDetail?.dmg_type && (
                  <div className="text font ">
                    Damage Type : {abilityDetail?.dmg_type}
                  </div>
                )}
                {abilityDetail?.bkbpierce && (
                  <div className="text font ">
                    Pierce Spell Immunity : {abilityDetail?.bkbpierce}
                  </div>
                )}
                {abilityDetail?.desc && (
                  <div className="text font ">{abilityDetail?.desc}</div>
                )}
                {abilityDetail?.mc && (
                  <li>
                    Mana Cost:{" "}
                    {Array.isArray(abilityDetail?.mc)
                      ? abilityDetail?.mc.join(" / ")
                      : abilityDetail?.mc}{" "}
                    Mana
                  </li>
                )}
                {abilityDetail?.cd && (
                  <li>
                    Cooldown:{" "}
                    {Array.isArray(abilityDetail.cd)
                      ? abilityDetail.cd.join(" / ")
                      : abilityDetail.cd}{" "}
                    s
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AbilityDetail;
