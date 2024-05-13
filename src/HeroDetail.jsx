import { useEffect, useReducer } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  GiBiceps,
  GiWindyStripes,
  GiSwordman,
  GiBowman,
  GiSpinningSword,
  GiSpeedometer,
} from "react-icons/gi";
import { FaGlobe, FaRecycle, FaRunning, FaEye, FaBrain } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getDetailHero } from "./redux/actions/dataAction";
import { getLoreHero, getHeroAbilities } from "./redux/actions/dataAction2";
import { setDName } from "./redux/reducers/dataReducer2";

const HeroDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.data.heroDetail);
  const name = useSelector((state) => state.data.heroDetail.name);
  const heroName = name.split("_").slice(3).join("_");
  const lore = useSelector((state) => state.data2.lores);
  const myHeroLore = lore[heroName];
  const abilities = useSelector((state) => state.data2.abilities);
  // const ability_ids = useSelector((state) => state.data2.ability_ids);
  const heroAbilities = Object.keys(abilities)
    .filter((key) => key.startsWith(heroName))
    .map((key) => abilities[key]);

  console.log("heroAbilities :>> ", heroAbilities);

  useEffect(() => {
    dispatch(getDetailHero());
  }, []);

  useEffect(() => {
    dispatch(getLoreHero());
  }, []);

  useEffect(() => {
    dispatch(getHeroAbilities());
  }, []);

  const getPrimaryAttributeFullName = (attr) => {
    switch (attr) {
      case "agi":
        return "Agility";
      case "str":
        return "Strength";
      case "int":
        return "Intelligence";
      default:
        return "Universal";
    }
  };

  const getPrimaryAttributeIcon = (primaryAttr) => {
    switch (primaryAttr) {
      case "str":
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <GiBiceps size={23} color={"red"} />
          </div>
        );
      case "agi":
        return (
          <div
            style={{
              backgroundColor: `#ebe8e8`,
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <GiWindyStripes size={23} color={"lime"} />
          </div>
        );
      case "int":
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <FaWandMagicSparkles size={23} color={"skyblue"} />
          </div>
        );
      default:
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <FaRecycle size={23} color={"white"} />
          </div>
        ); // Return null or a default icon if primary attribute is unknown
    }
  };

  const getAttackTypeIcon = (attack_type) => {
    switch (attack_type) {
      case "Melee":
        return (
          <div>
            <GiSwordman size={25} color={"white"} />
          </div>
        );
      case "Ranged":
        return <GiBowman size={25} color={"white"} />;
      default:
        return null; // Return null or a default icon if primary attribute is unknown
    }
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply h-full min-h-screen "
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div class="rounded shadow-lg p-10 space-y-4 backdrop-blur-sm bg-black/60 mt-28">
          <div className="">
            <div className="flex pl-10">
              <img
                src={`https://cdn.cloudflare.steamstatic.com${detail?.img}`}
                className="w-auto h-56 rounded-lg flex-shrink-0 "
                alt={detail?.localized_name}
              />

              <div className="grid grid-cols-8 gap-3 mt-3 ml-5 items-center">
                {heroAbilities.map((ability, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate("/ability-detail");
                      dispatch(setDName(ability.dname));
                    }}
                    className="relative flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-300"
                  >
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com${ability?.img}`}
                      className="w-18 h-18 object-cover rounded-lg"
                      alt={ability?.dname}
                    />
                    <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute top-0 left-0 right-0 bottom-0 inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-lg">
                      <p className="text-white text-center text-sm font-semibold">
                        {ability?.dname}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col pl-10 pt-5">
              <div className="flex gap-2 items-center">
                <img
                  src={`https://cdn.cloudflare.steamstatic.com${detail?.icon}`}
                  className="w-auto h-14 object-cover rounded-lg"
                  alt={detail?.localized_name}
                />
                <h1 className="text-3xl font-semibold text-white">
                  {detail?.localized_name}
                </h1>
              </div>
              <div className="text-white w-4/5 text-sm pt-2">{myHeroLore}</div>

              <div className="flex space-x-10 font-medium text-sm pt-5">
                <div>
                  <div className="flex  gap-2">
                    {detail?.roles && (
                      <div className="text ">
                        <span className="text-white">Roles:</span>
                        <ul className="list-disc ml-6 text-white">
                          {detail.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 items-center">
                    <div className="text  text-white">
                      Attack Type : {detail?.attack_type}
                    </div>
                    {getAttackTypeIcon(detail?.attack_type)}
                  </div>
                  <div className="flex gap-2">
                    <TbRulerMeasure size={23} color={"white"} />
                    <div className="text  text-white">
                      Attack Range : {detail?.attack_range}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <GiSpeedometer size={23} color={"white"} />
                    <div className="text  text-white">
                      Attack Speed : {detail?.base_attack_time}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <PiClockClockwiseBold size={23} color={"white"} />
                    <div className="text  text-white">
                      Base Attack Time : {detail?.attack_rate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <FaRunning size={23} color={"white"} />
                    <div className="flex gap-2 items-center">
                      <div className="text  text-white">
                        Move Speed: {detail?.move_speed}
                      </div>
                      <IoSunny size={22} color={"white"} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text  text-white">
                        / {detail?.move_speed + 30}
                      </div>
                      <IoMoonSharp size={19} color={"white"} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <FaEye size={23} color={"white"} />
                    <div className="flex gap-2 items-center">
                      <div className="text  text-white">
                        Vision Range: {detail?.day_vision}
                      </div>
                      <IoSunny size={22} color={"white"} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text  text-white">
                        / {detail?.night_vision}
                      </div>
                      <IoMoonSharp size={19} color={"white"} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <div className="text  text-white flex items-center">
                      Primary Attribute :{" "}
                      {getPrimaryAttributeFullName(detail?.primary_attr)}
                    </div>
                    {getPrimaryAttributeIcon(detail?.primary_attr)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        backgroundColor: "#ebe8e8",
                        padding: "6px",
                        borderRadius: "90%",
                      }}
                    >
                      <GiBiceps size={20} color={"red"} />
                    </div>{" "}
                    <div className="text text-white flex items-center">
                      {detail?.base_str} + {detail?.str_gain}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 ">
                    <div
                      style={{
                        backgroundColor: "#ebe8e8",
                        padding: "6px",
                        borderRadius: "90%",
                      }}
                    >
                      <GiWindyStripes size={20} color={"lime"} />
                    </div>
                    <div className="text  text-white flex items-center">
                      {detail?.base_agi} + {detail?.agi_gain}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div
                      style={{
                        backgroundColor: "#ebe8e8",
                        padding: "6px",
                        borderRadius: "90%",
                      }}
                    >
                      <FaWandMagicSparkles size={20} color={"skyblue"} />
                    </div>
                    <div className="text  text-white flex items-center">
                      {detail?.base_int} + {detail?.int_gain}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-400 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300 hover:scale-105"
              onClick={() => {
                navigate("/heroes", { state: { id: detail?.id } });
              }}
            >
              <div className="w-5 h-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    transform="rotate(180 256 256)"
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                  />
                </svg>
              </div>
              <span class="sr-only">Icon description</span>
            </button>
            <button
              className="mt-7 px-4 py-2 font-semibold bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-400 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300 hover:scale-105"
              onClick={() => {
                navigate("/hero-matchup", { state: { id: detail?.id } });
              }}
            >
              Show Matchups
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HeroDetail;
