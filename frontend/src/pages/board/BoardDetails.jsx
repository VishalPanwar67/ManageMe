import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  ButtonDel,
  ButtonEdit,
  ButtonBack,
  ButtonRight,
  ButtonCancel,
} from "../../components/index.component.js";

const BoardDetails = () => {
  const { boardId } = useParams();

  const [board, setBoard] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [lists, setLists] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) {
        setError(new Error("Board ID not found."));
        return;
      }
      try {
        const response = await axios.get(`/api/board/${boardId}`);
        setBoard(response.data.data);
        setUpdatedTitle(response.data.data.title);
        setUpdatedDescription(response.data.data.description);
      } catch (error) {
        setError(error);
      }
    };
    const fetchlist = async () => {
      if (!boardId) {
        setError(new Error("Board ID not found."));
        return;
      }
      try {
        const response = await axios.get(`/api/list/${boardId}`);
        setLists(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBoard();
    fetchlist();
  }, [boardId]);

  const deleteBoard = async (boardId) => {
    try {
      await axios.delete(`/api/board/${boardId}`);
      console.log("Board deleted successfully");
      navigate("/board");
    } catch (error) {
      console.error(error);
    }
  };

  const editBoard = async () => {
    try {
      const updatedBoard = {
        title: updatedTitle,
        description: updatedDescription,
      };
      await axios.patch(`/api/board/${board._id}`, updatedBoard);
      setBoard({ ...board, ...updatedBoard });
      setEditMode(false);
    } catch (error) {
      setError(error);
      console.error("Error updating board", error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!board) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="w-[80%] block  my-5 m-auto">
        <div className="card w-full font-sans bg-white rounded-lg overflow-hidden transform transition duration-500">
          <div className="p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="flex justify-between items-center">
              <div className="flex space-x-[5px]">
                <ButtonBack onClick={() => navigate("/board")} />
                {/* Title Box */}
                <div className="text-lg font-bold drop-shadow-md flex justify-between items-center">
                  {editMode ? (
                    <input
                      className="bg-gray-100 text-black rounded p-1"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    board.title
                  )}
                </div>
              </div>
              {/* Save and Cancel buttons Area */}
              <div className="flex space-x-[5px]">
                {editMode ? (
                  <>
                    <ButtonRight onClick={editBoard} />
                    <ButtonCancel onClick={() => setEditMode(false)} />
                  </>
                ) : (
                  <ButtonEdit onClick={() => setEditMode(true)} />
                )}
                <ButtonDel onClick={() => deleteBoard(board._id)} />
              </div>
            </div>
          </div>
          {/* description Area */}
          <div className="p-6 font-montserrat">
            {editMode ? (
              <textarea
                className="w-full bg-gray-100 text-black rounded p-2"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            ) : (
              <div className="text-gray-700 mb-4">{board.description}</div>
            )}
            <div>
              {/* List Area */}
              {lists?.map((list) => (
                <div
                  className="p-2 m-1 flex justify-between items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-tr-3xl
                  rounded-bl-3xl"
                  key={list._id}
                >
                  <div className="text-base font-normal drop-shadow-md flex justify-between items-center">
                    {list.title}
                  </div>
                  <div className="flex space-x-[5px]">
                    {/* <Link to={`/list/${boardId}/${list._id}`}> */}
                    <ButtonBack
                      rotate="0"
                      onClick={() => navigate(`/list/${boardId}/${list._id}`)}
                    />
                    {/* </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Created At and Updated At Area */}
          <div className="bg-gray-100 text-center p-3">
            <div className="text-gray-600 font-mono text-sm">
              {"| "}
              <span>
                <strong>Created At: </strong>
                {new Date(board.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                ,{" "}
                {new Date(board.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {" | "}
              <span>
                <strong>Updated At: </strong>
                {new Date(board.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                ,{" "}
                {new Date(board.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {" |"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetails;
