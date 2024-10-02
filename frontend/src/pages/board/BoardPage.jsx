import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

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
      <div className="w-full min-h-screen h-auto flex flex-col justify-content items-center bg-purple-900 border border-yellow-300 p-3">
        <h1 className="text-cyan-600 text-2xl font-bold border border-cyan-600">
          Board Page{" "}
        </h1>
        <div className="w-[95%] flex flex-wrap border border-yellow-300 mt-2">
          <hr />
          {error && <p className="text-red-500">{error.message}</p>}
          {boards.map((board) => (
            <Link to={`/board/${board._id}`} key={board._id}>
              <div className="w-80 min-w-20 h-80 m-3 border border-yellow-300">
                <p>{board._id}</p>
                <h2>{board.title}</h2>
                <h3>{board.description}</h3>
                <small>{board.createdAt}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardPage;
