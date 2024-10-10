import React from "react";

import {
  ButtonCall,
  ButtonModrn,
  ButtonDel,
  ButtonEdit,
  ButtonBack,
  ButtonRight,
  ButtonCancel,
} from "./button/Button.jsx";
import { Input } from "./Input.jsx";
import ActiveLog from "./ActiveLog.jsx";

function Demo() {
  return (
    <div>
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
