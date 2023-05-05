import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut, removeToken } from "../../Global/globalState";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
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
            <Link to="/response" className="no-underline">
              response
            </Link>
          </div>
          <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
            <Link to="/just" className="no-underline">
              just
            </Link>
          </div>
          <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
            <Link to="/create-game" className="no-underline">
              Create Game
            </Link>
          </div>
          {user ? (
            <div
              className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4"
              onClick={() => {

                const time = setTimeout(() => {
                  dispatch(logOut());
                  dispatch(removeToken(null));
                  navigate("/sign-in");

                  clearTimeout(time);
                }, 1000);
              }}
            >
              Log out3
            </div>
          ) : (
            <div className="text-[19px] font-bold cursor-pointer hover:scale-105 hover:text-red-200 ease-in-out duration-300 uppercase mx-4">
              <Link to="/sign-in" className="no-underline">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
