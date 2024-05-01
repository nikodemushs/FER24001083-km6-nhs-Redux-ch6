import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/reducers/authReducer";
import { getUserData } from "./redux/actions/authAction";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  console.log("token :>> ", token);
  const cekState = useSelector((state) => state);
  console.log("cekState :>> ", cekState);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <nav className=" py-6 px-3 fixed top-0 w-full z-10 bg-black/75">
      <div className="container mx-auto flex justify-between ">
        <a
          href="/"
          className="flex items-center  text-4xl text-red-500 font-bold hover:text-red-600 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mr-2 fill-current hover:text-primary hover:scale-110"
            viewBox="0 0 48 48"
          >
            <path
              fill="#f44336"
              fillRule="evenodd"
              d="M12.3,27l7.7,8.333L12.85,37L9,33.667L12.3,27z M32.622,11 L36,12.857L34.874,19l-7.882-5.143L32.622,11z M11.625,11c0.375,0,0.676,0.016,1.125,0.375c0.625,0.5,2.93,2.132,2.93,2.132 l0.418,0.743c0.761,0.038,0.78,0.107,1.741,0.813L39,29.417C38.837,29.77,36.321,37,36.321,37h-3.884L9,12.25 c0,0,0.382-0.143,0.75-0.375C10.327,11.512,11.053,11,11.625,11z M14.5,6H6c-0.528,0.264-1,0.57-1,1.625L5,14.5l0,2.125l0.988,2.748 L5,20.75v1.125l1,0.75V24l-1,1v3.75l1,0.625V33.5c-1.044,0.743-1,1.625-1,2.639l0,4.736C7.339,41.459,6.951,42,9.625,42 c2.363,0,3.875,0,3.875,0c0.362-0.023,0.644-0.099,1-0.133C15.494,41.771,16.125,41,16.125,41l2.625,1l1-1c0,0,1.311,1.623,1.625,2 l0.875-1L25,43c0,0,1.02-0.979,2.125-1H32.5c0.082-0.079,1-1,1-1c0.421,0.252,0.049,1,3.875,1c1.056,0,2-0.25,2-0.25 c-0.162-0.54-0.18-0.43-0.5-0.75c0,0,2.5,0,4.125,1V26.507l-2,0.618c0.039-0.317,0.963-0.738,1-1.375 c0.047-0.803-0.044-3.586-0.161-4.174c-0.06-0.3-0.633-1.179-0.839-1.451C41.245,19.464,42,19,42,19v-0.75l1-0.583v-4.222L42,9.25 l1-1.083V6.971l-1.056-0.915l-3.43-0.567l-0.792,0.567l-0.396-0.66c0,0-5.184-0.394-6.124-0.394c-1.203,0-1.028,0.09-1.435,1.445 l-1.726,0.176L27.875,6h-1.75l0.288-0.317C26.719,5.394,26.612,5.51,26.851,5h-6.018c-0.094,0.172-0.438,0.562-0.709,1 c0,0-0.528-0.005-0.924,0.259S18.806,7,18.278,7s-1.623,0-2.243,0C14.715,7,14.5,6,14.5,6z"
              clipRule="evenodd"
            ></path>
          </svg>
          DotaDB
        </a>
        <div className="hidden md:flex items-center gap-2 ">
          <div className="flex gap-4 ">
            <a href="/heroes">
              <p className="text font-semibold p-1 px-2 text-white cursor-pointer rounded-lg hover:text-primary hover:scale-105 hover:bg-white hover:text-black">
                Heroes
              </p>
            </a>
            <a href="/items">
              <p className="text font-semibold p-1 px-2 text-white cursor-pointer rounded-lg hover:text-primary hover:scale-105 hover:bg-white hover:text-black">
                Items
              </p>
            </a>
            {!token && (
              <a href="/login">
                <p className="text font-semibold p-1 px-2 text-white cursor-pointer rounded-lg hover:text-primary hover:scale-105 hover:bg-white hover:text-black">
                  Login
                </p>
              </a>
            )}
            {token && (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 text font-semibold p-1 px-2 cursor-pointer rounded-lg hover:text-primary hover:scale-105 bg-white"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <CgProfile size={22} />
                  {`${username} `}
                  {isDropdownOpen ? (
                    <IoChevronUpOutline size={22} />
                  ) : (
                    <IoChevronDownOutline size={22} />
                  )}
                </div>
                {isDropdownOpen && (
                  <div className=" absolute top-full mt-1 right-0 font-semibold bg-white rounded-lg shadow-lg hover:scale-105">
                    <p
                      onClick={handleLogout}
                      className="flex  items-center gap-2  p-1 px-2  font-semibold text- text-gray-700 hover:bg-gray-300 cursor-pointer rounded-lg hover:text-primary"
                    >
                      Logout
                      <IoLogOutOutline size={22} />
                    </p>
                  </div>
                )}
              </div>
            )}
            {showConfirmation && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg font-semibold text-lg">
                  <p>Log out</p>
                  <p className="font-thin text-sm">
                    You will be returned to the home screen
                  </p>

                  <div className="flex justify-center mt-4 text-sm ">
                    <button
                      className="mr-2 px-4 py-2 bg-white text-gray-400 rounded-lg hover:bg-gray-300 "
                      onClick={cancelLogout}
                    >
                      Cancel
                    </button>
                    <button
                      className=" px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-red-400"
                      onClick={confirmLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
