import React from "react";
import "./delbutton.css";
import "./editButton.css";
import "./backButton.css";
import "./rightButton.css";

const ButtonCall = ({
  text = "Click Me", // Default text
  color = "blue", // Default color
  pgColor = "white", // Default pgColor
  onClick = () => alert(`${text} Button clicked!`),
}) => {
  return (
    <button
      className={`relative flex items-center px-6 py-3 border-[0px] border-red-500 overflow-hidden font-medium transition-all rounded-md group m-[0.5px] bg-${color}-500`}
      onClick={onClick}
    >
      <span
        className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-${color}-600 rounded group-hover:-mr-4 group-hover:-mt-4`}
      >
        <span
          className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-${pgColor}`}
        ></span>
      </span>
      <span
        className={`absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-${color}-600 rounded group-hover:-ml-4 group-hover:-mb-4`}
      >
        <span
          className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-${pgColor}`}
        ></span>
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

const ButtonDel = ({ onClick = () => alert(`ButtonDel Button clicked!`) }) => {
  return (
    <>
      <button className="delete-button" onClick={onClick}>
        <svg className="delete-svgIcon" viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
      </button>
    </>
  );
};

const ButtonEdit = ({
  onClick = () => alert(`ButtonEdit Button clicked!`),
}) => {
  return (
    <>
      <button className="edit-button" onClick={onClick}>
        <svg className="edit-svgIcon" viewBox="0 0 512 512">
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
      </button>
    </>
  );
};
const ButtonBack = ({
  rotate = "180",

  onClick = () => alert(`ButtonBack Button clicked!`),
}) => {
  return (
    <>
      <button
        className={`back-button transform rotate-${rotate} `}
        onClick={onClick}
      >
        <svg className="back-svgIcon" viewBox="0 0 46 40">
          <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
        </svg>
      </button>
    </>
  );
};

const ButtonRight = ({
  onClick = () => alert(`ButtonBack Button clicked!`),
}) => {
  return (
    <>
      <button className="right-button" onClick={onClick}>
        <svg className="right-svgIcon" viewBox="0 0 48 48" fill="red">
          <path d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z"></path>
        </svg>
      </button>
    </>
  );
};

const ButtonCancel = ({
  onClick = () => alert(`ButtonBack Button clicked!`),
}) => {
  return (
    <>
      <button
        className="w-10 h-10 rounded-full bg-red-200 text-white font-black hover:bg-red-600"
        onClick={onClick}
      >
        X
      </button>
    </>
  );
};

export {
  ButtonCall,
  ButtonModrn,
  ButtonDel,
  ButtonEdit,
  ButtonBack,
  ButtonRight,
  ButtonCancel,
};
