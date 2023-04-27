import { useState } from "react";
import Button from "../components/Static/Button";

const CreateGame = () => {
  const [name, setName] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center w-100% bg-slate-400 ">
      <div className="w-[600px] min-h-[200px] bg-red-300 flex justify-center items-center flex-col py-[30px]">
        <input
          placeholder="name"
          className="my-2 w-[400px] h-12 outline-0 pl-5 rounded "
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="detail"
          className="my-2 w-[400px] h-12 outline-0 pl-5 rounded "
          value={detail}
          onChange={(e: any) => {
            setDetail(e.target.value);
          }}
        />
        <br />
        <br />
        <Button title="Create Game" bb="bg-orange-500" />
      </div>
    </div>
  );
};

export default CreateGame;
