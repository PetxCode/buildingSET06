import { refreshGame, viewGames } from "../utils/APIs";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export const usePermit = () => {
  const [game, setGame] = useState<[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);

  viewGames(token).then((res) => {
    setGame(res?.data.data);
  });

  return game;
};
