import React from "react";
import { useParams } from "react-router-dom";

const BoardPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Board Page - {id}</h1>
    </div>
  );
};

export default BoardPage;
