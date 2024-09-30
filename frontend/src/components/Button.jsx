import React from "react";

const ButtonCall = ({
  text = "Click Me", // Default text
  color = "indigo", // Default color
  onClick = () => alert(`${text} Button clicked!`),
}) => {
  const bgColor = `bg-${color}-500`;
  // const bgColor = `bg-blue-500`;
  const otherColor = `bg-${color}-600`;
  return (
    <button
      className={`relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all ${bgColor} rounded-md group m-[0.5px]`}
      onClick={onClick}
    >
      <span
        className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${otherColor} rounded group-hover:-mr-4 group-hover:-mt-4`}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={`absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${otherColor} rounded group-hover:-ml-4 group-hover:-mb-4`}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={`absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full ${otherColor} rounded-md group-hover:translate-x-0`}
      ></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

const ButtonModrn = ({
  text = "Button",
  color = "emerald",
  onClick = () => alert(`${text} Button clicked!`),
}) => {
  const bgColor = `bg-${color}-500`;
  const hoverColor1 = `bg-${color}-600`;
  const hoverColor2 = `bg-${color}-800`;
  // const bgColor = `bg-green-500`;
  // const hoverColor1 = `bg-green-600`;
  // const hoverColor2 = `bg-green-800`;

  return (
    <>
      <button
        className={`text-xl w-32 h-12 rounded ${bgColor} text-white relative overflow-hidden group z-10 hover:text-white duration-1000 m-[0.5px]`}
        onClick={onClick}
      >
        <span
          className={`absolute ${hoverColor1} w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all`}
        ></span>
        <span
          className={`absolute ${hoverColor2} w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all`}
        ></span>
        {text}
      </button>
    </>
  );
};

export { ButtonCall, ButtonModrn };
