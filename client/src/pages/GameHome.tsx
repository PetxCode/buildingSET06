import Button from "../components/Static/Button";
import { refreshGame, viewGames } from "../utils/APIs";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../Global/globalState";
import { usePermit } from "../hooks/usePermit";
import { useOne } from "../hooks/useOne";


const GameHome = () => {
  const dispatch = useDispatch();
  const game = usePermit();
  const userData: any = useOne()
  const user = useSelector((state: any) => state.user);

  return (
    <div className="h-[calc(100vh-5rem)] flex items-center w-100% bg-slate-400 flex-col  ">
      <br />
      <br />

      {userData?.email}<br />
      {userData?._id}

      <br />
      <br />

      <Button
        title="Create Access"
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
