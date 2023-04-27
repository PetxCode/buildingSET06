import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut, removeToken } from "../../Global/globalState";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-20 bg-black text-white w-100% flex justify-center">
      <div className="min-w-[700px] flex items-center justify-between ">
        <div className="text-[39px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 ">
          Logo
        </div>

        <div className="flex ">
          <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
            <Link to="/" className="no-underline">
              Games
            </Link>
          </div>
          <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
            <Link to="/create-game" className="no-underline">
              Create Game
            </Link>
          </div>
          <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
            <Link to="/sign-in" className="no-underline">
              Sign in
            </Link>
          </div>
          <div
            className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4"
            onClick={() => {
              dispatch(logOut());
              dispatch(removeToken());
            }}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
