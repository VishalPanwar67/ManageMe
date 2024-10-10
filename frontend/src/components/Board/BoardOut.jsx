import React from "react";
import { formatDate } from "../../utils/indexUtils.js";
import "./boardOut.css";

const BoardOut = ({
  title = "this is new board",
  description = "this is new board description",
  createdAt = "2023-01-01",
}) => {
  return (
    <>
      <div className="notification">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <div className="notititle">{title}</div>
        <div className="notibody">{description}</div>
        <small className="notibody">{formatDate(createdAt)}</small>
      </div>
    </>
  );
};

export default BoardOut;
