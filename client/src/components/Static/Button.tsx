import React from "react";

interface iButton {
  title?: string;
  cc?: string;
  bb?: string;
  onClick?: () => void;
}

const Button: React.FC<iButton> = ({ title, onClick, bb, cc }) => {
  return (
    <div className={`${bb} ${cc} rounded-lg  `}>
      <div
        className=" w-[150px] h-12 flex items-center justify-center duration-300 ease-in-out hover:scale-105 cursor-pointer "
        onClick={onClick}
      >
        <div>{title}</div>
      </div>
    </div>
  );
};

export default Button;
