import React from "react";

import {
  ButtonCall,
  ButtonModrn,
  ButtonDel,
  ButtonEdit,
  ButtonBack,
  ButtonRight,
  ButtonCancel,
  ButtonHome,
} from "./button/Button.jsx";
import { Input } from "./Input.jsx";
import ActiveLog from "./ActiveLog.jsx";
import Profile from "./Profile.jsx";
import BoardOut from "./Board/BoardOut.jsx";

function Demo() {
  return (
    <div>
      <BoardOut />
      <Profile />

      <ButtonHome />
      <ButtonCall text="ButtonCall" color="orange" />
      <ButtonModrn text="ButtonModrn" color="cyan" />
      <ButtonDel />
      <ButtonEdit />
      <ButtonBack />
      <ButtonRight />
      <ButtonCancel />
      <Input
        bgColor="red"
        textColor="blue"
        placeholder="Input"
        borderColor="yellow"
      />

      <ActiveLog />
    </div>
  );
}

export default Demo;
