import React from "react";

const ButtonModrn = ({
  text = "Button", // Default button text
  bgColor = "bg-emerald-500", // Default background color
  hoverColor1 = "bg-emerald-600", // Default hover color 1
  hoverColor2 = "bg-emerald-800", // Default hover color 2
}) => {
  return (
    <button
      className={`text-xl w-32 h-12 rounded ${bgColor} text-white relative overflow-hidden group z-10 hover:text-white duration-1000 m-[0.5px]`}
    >
      <span
        className={`absolute ${hoverColor1} w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all`}
      ></span>
      <span
        className={`absolute ${hoverColor2} w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all`}
      ></span>
      {text}
    </button>
  );
};

export default ButtonModrn;
