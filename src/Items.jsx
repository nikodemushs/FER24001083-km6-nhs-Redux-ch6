import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { data } from "./Data";
import { GiBiceps, GiWindyStripes } from "react-icons/gi";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCoins,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { getAllItems } from "./redux/actions/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { setItemId, setSearchTerm } from "./redux/reducers/dataReducer";

const Items = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data.items);
  console.log("reduxItems :>> ", items);
  const searchTerm = useSelector((state) => state.data.searchTerm);
  console.log("searchTermRedux :>> ", searchTerm);
  const [sortCost, setSortCost] = useState("desc");
  const [sortName, setSortName] = useState("asc");
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  useEffect(() => {
    dispatch(getAllItems());
    return () => {
      dispatch(setSearchTerm(""));
    };
  }, []);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  let filteredItems = items
    .filter((itemDetails) =>
      itemDetails?.dname?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortName === "asc") {
        return a.dname.localeCompare(b.dname); // Sort in ascending order
      } else {
        return b.dname.localeCompare(a.dname); // Sort in descending order
      }
    })

    .sort((a, b) => {
      if (sortCost === "asc") {
        return a.cost - b.cost; // Sort in ascending order
      } else {
        return b.cost - a.cost; // Sort in descending order
      }
    });

  const toggleSortName = () => {
    setSortName(sortName === "asc" ? "desc" : "asc");
  };
  const toggleSortCost = () => {
    setSortCost(sortCost === "asc" ? "desc" : "asc");
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply text-center h-full  min-h-screen "
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <Navbar />
      <div class=" flex flex-col rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/20 mb">
        <h1 className="pt-28 pb-5 text-4xl font-bold tracking-tight leading-tight text-white md:text-5xl lg:text-6xl">
          Pick your favorite items!{" "}
        </h1>
        <form class="max-w-lg mx-auto ">
          <div class="flex gap-3 justify-center items-center">
            <div className="flex items-center space-x-6">
              <div
                onClick={toggleSortCost}
                class=" bg-white hover:bg-neutral-300  focus:outline-none focus:ring focus:ring-neutral-500 hover:scale-110  font-medium rounded-lg text-sm px-2 text-center inline-flex items-center p-2  py-2"
              >
                {isActive2 ? (
                  <FaSortAmountUp
                    size={25}
                    onClick={() => {
                      setIsActive2(!isActive2);
                    }}
                  />
                ) : (
                  <FaSortAmountDown
                    size={25}
                    onClick={() => {
                      setIsActive2(!isActive2);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div
                onClick={toggleSortName}
                class=" bg-white hover:bg-neutral-300  focus:outline-none focus:ring focus:ring-neutral-500 hover:scale-110  font-medium rounded-lg text-sm px-2 text-center inline-flex items-center p-2 py-2"
              >
                {isActive ? (
                  <FaSortAlphaUp
                    size={25}
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  />
                ) : (
                  <FaSortAlphaDown
                    size={25}
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  />
                )}
              </div>
            </div>

            <form className=" w-[400px] font-family: Poppins font-sans ">
              <label
                for="search"
                class="mb-2 text-sm font-medium text-gray-900  sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search heroes..."
                  value={searchTerm}
                  onChange={handleSearch}
                  class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 "
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 py-1 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-7 gap-3 mx-10">
        {filteredItems.map((itemDetails) => (
          <div
            key={itemDetails?.id}
            className="relative flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-300"
            onClick={() => {
              navigate("/item-detail");
              dispatch(setItemId(itemDetails.id));
            }}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com${itemDetails?.img}`}
              className="w-full h-full
             object-cover rounded-lg"
              alt={itemDetails?.dname}
            />
            <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-lg">
              <div className="flex flex-col">
                <p className="text-white text-center text-lg font-semibold">
                  {itemDetails?.dname}
                </p>

                <p className="text-white text-center text-lg font-semibold flex items-center justify-center gap-1">
                  {itemDetails?.cost !== 0 ? (
                    <>
                      {`${itemDetails?.cost} `} <FaCoins />
                    </>
                  ) : (
                    "Neutral Item"
                  )}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-[440px]">
        <Footer />
      </div>
    </div>
  );
};

export default Items;
