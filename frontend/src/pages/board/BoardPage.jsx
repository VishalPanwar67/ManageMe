import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

import {
  Input,
  ButtonModrn,
  BoardOut,
  ButtonHome,
} from "../../components/index.component";

const BoardPage = () => {
  const [error, setError] = useState(null);
  const [boards, setBoards] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

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

  const createBoard = async () => {
    try {
      const response = await axios.post("/api/board", {
        title: newBoardTitle,
        description: newBoardDescription,
      });
      setBoards([...boards, response.data.data]);
      setIsCreating(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen h-auto flex flex-col justify-content items-center bg-purple-900 p-3">
        <ButtonHome />
        <h1 className="text-cyan-600 text-2xl font-bold ">Board Page </h1>
        <div className=" m-0 absolute top-16 right-20 z-10">
          <ButtonModrn
            text="Create"
            color="blue"
            onClick={() => setIsCreating(!isCreating)}
          />
        </div>
        {isCreating && (
          <div className="absolute   z-20 w-[95%] h-screen bg-slate-500 opacity-50 blur-xl"></div>
        )}
        {isCreating && (
          <div className=" flex align-center justify-center absolute  z-30 w-[80%] h-[80vh] ">
            <div className="mt-4 flex flex-col gap-2 w-[50%] justify-center align-center">
              <Input
                placeholder="Board Title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                // className="p-2 border rounded"
              />
              <Input
                type="text"
                placeholder="Board Description"
                value={newBoardDescription}
                onChange={(e) => setNewBoardDescription(e.target.value)}
                // className="p-2 border rounded ml-2"
              />
              <div className=" flex align-center justify-center ">
                <ButtonModrn text="Create Board" onClick={createBoard} />
              </div>
            </div>
          </div>
        )}

        <hr />
        <div className="w-[95%] flex flex-wrap gap-3 mt-2">
          {error && <p className="text-red-500">{error.message}</p>}
          {boards.map((board) => (
            <Link to={`/board/${board._id}`} key={board._id}>
              <BoardOut
                title={board.title}
                description={board.description}
                createdAt={board.createdAt}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardPage;
