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
    </div>
  );
}

export default Demo;
