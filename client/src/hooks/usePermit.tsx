import { refreshGame, viewGames } from "../utils/APIs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logOut, removeToken, updateToken } from "../Global/globalState";
import { useNavigate } from "react-router-dom";

export const usePermit = () => {
  const [game, setGame] = useState<[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);

  useEffect(() => {
    const timer = setInterval(() => {
      refreshGame(user.refreshToken).then((res) => {
        console.log("refersh Error: ", res?.data)
        if (res?.data === undefined) {
          dispatch(logOut())
          dispatch(removeToken(null))
          clearInterval(timer)
          navigate("/sign-in")
        }
        dispatch(updateToken(res?.data?.data?.accessToken))
      })
    }, 19000)
  }, [])



  if (user) {
    viewGames(token).then((res) => {
      setGame(res?.data.data);
    });
  }
  return game;
};
