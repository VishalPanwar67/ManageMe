import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "./boardPage.css";

const BoardPage = () => {
  const [error, setError] = useState(null);
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("/api/board");
        setBoards(response.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBoards();
  }, []);

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!boards) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="w-full min-h-screen h-auto flex flex-col justify-content items-center bg-purple-900 p-3">
        <h1 className="text-cyan-600 text-2xl font-bold ">
          Board Page{" "}
        </h1>
        <div className="w-[95%] flex flex-wrap gap-4 mt-2">
          <hr />
          {error && <p className="text-red-500">{error.message}</p>}
          {/* /* From Uiverse.io by SouravBandyopadhyay */}

          {/* {loop} */}
          {boards.map((board) => (
            <Link to={`/board/${board._id}`} key={board._id}>
              <div class="notification">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">{board.title}</div>
                <div class="notibody">{board.description}</div>
                <small class="notibody">{board.createdAt}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardPage;
