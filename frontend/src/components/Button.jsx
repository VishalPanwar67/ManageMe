import React from "react";

const ButtonCall = ({
  text = "Click Me", // Default text
  color = "blue", // Default color
  onClick = () => alert(`${text} Button clicked!`),
}) => {
  return (
    <button
      className={`relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all rounded-md group m-[0.5px] bg-${color}-500`}
      onClick={onClick}
    >
      <span
        className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-${color}-600 rounded group-hover:-mr-4 group-hover:-mt-4`}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={`absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-${color}-600 rounded group-hover:-ml-4 group-hover:-mb-4`}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={`absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-${color}-600 rounded-md group-hover:translate-x-0`}
      ></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

const ButtonModrn = ({
  text = "Button",
  color = "blue",
  onClick = () => alert(`${text} Button clicked!`),
}) => {
  return (
    <>
      <button
        className={`text-xl w-32 h-12 rounded bg-${color}-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000 m-[0.5px]`}
        onClick={onClick}
      >
        <span
          className={`absolute bg-${color}-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all`}
        ></span>
        <span
          className={`absolute bg-${color}-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all`}
        ></span>
        {text}
      </button>
    </>
  );
};

export { ButtonCall, ButtonModrn };
