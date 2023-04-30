import { useState } from "react";
import Button from "../components/Static/Button";
import { signin } from "../utils/APIs";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, updateToken } from "../Global/globalState";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  console.log(user);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center w-100% bg-slate-400 ">
      <div className="w-[600px] min-h-[200px] bg-red-300 flex justify-center items-center flex-col py-[30px]">
        <input
          placeholder="email"
          className="my-2 w-[400px] h-12 outline-0 pl-5 rounded "
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          className="my-2 w-[400px] h-12 outline-0 pl-5 rounded "
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <Button
          title="Sign in"
          bb="bg-teal-400"
          cc="text-white"
          onClick={() => {
            signin({ email, password }).then((res) => {
              dispatch(currentUser(res?.data.data));
              dispatch(updateToken(res?.data.data.accessToken));
              console.log("Clicked");
              navigate("/");
            });
          }}
        />


      </div>
    </div>
  );
};

export default Signin;
