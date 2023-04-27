import Button from "../components/Static/Button";
import { refreshGame, viewGames } from "../utils/APIs";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../Global/globalState";
import { usePermit } from "../hooks/usePermit";

const GameHome = () => {
  const dispatch = useDispatch();
  const game = usePermit();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);

  return (
    <div className="h-[calc(100vh-5rem)] flex items-center w-100% bg-slate-400 flex-col  ">
      <br />
      <br />
      <Button
        title="Sign in"
        bb="bg-white"
        onClick={() => {
          refreshGame(user.refreshToken).then((res) => {
            console.log(res);
            dispatch(updateToken(res?.data.data.accessToken));
          });
        }}
      />
      <br />
      <br />
      <br />
      <div>
        {game?.map((props: any, i: number) => (
          <div key={i}>
            <div>{props.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHome;
