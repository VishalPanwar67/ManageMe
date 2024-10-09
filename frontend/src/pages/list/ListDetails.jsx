import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./listDetails.css";
import {
  ButtonDel,
  ButtonEdit,
  ButtonBack,
  ButtonRight,
  ButtonCancel,
  ButtonModrn,
} from "../../components/index.component.js";

const ListDetails = () => {
  const { boardId, listId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [list, setList] = useState(null);
  const [cards, setCards] = useState(null);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) {
        setError(new Error("Board ID not found."));
        return;
      }
      try {
        const response = await axios.get(`/api/board/${boardId}`);
        setBoard(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchlist = async () => {
      if (!listId) {
        setError(new Error("list ID not found."));
        return;
      }
      try {
        const response = await axios.get(`/api/list/${boardId}/${listId}`);
        setList(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchCards = async () => {
      if (!listId) {
        setError(new Error("list ID not found."));
        return;
      }
      try {
        const response = await axios.get(`/api/card/${listId}`);
        setCards(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchBoard();
    fetchlist();
    fetchCards();
  }, [listId]);

  const editList = async () => {
    try {
      const updatedList = {
        title: updatedTitle,
      };
      await axios.patch(`/api/list/${board._id}/${list._id}`, updatedList);
      setList({ ...list, ...updatedList });
      setEditMode(false);
    } catch (error) {
      setError(error);
      // console.error("Error updating list", error);
    }
    // console.log("edit list");
  };

  const deleteList = async (listId) => {
    try {
      await axios.delete(`/api/list/${boardId}/${listId}`);
      // Use template literals correctly in navigate
      navigate(`/board/${boardId}`);
    } catch (error) {
      // console.error("Error deleting list:", error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!board) {
    return <p>Loading...</p>;
  }

  const createCard = async () => {
    try {
      const newCard = {
        title: "New Card",
        description: "",
      };
      const response = await axios.post(`/api/card/${listId}`, newCard);
      setCards([...cards, response.data.data]);
    } catch (error) {
      setError(error);
      // console.error("Error creating card", error);
    }
  };
  return (
    <>
      <section className="w-full min-h-screen h-auto flex align-center justify-center p-4  ">
        <div className="w-[90%] flex flex-col align-start  gap-2 p-4 relative overflow-hidden bg-gradient-to-r from-[rgb(137,104,255)] to-[rgb(175,152,255)]  before:w-[45%] before:h-[75%] before:content-[''] before:bg-gradient-to-r before:from-[rgb(142,110,255)] before:to-[rgb(208,195,255)] before:rounded-full before:absolute before:z-1 before:top-[-30%] before:right-[-25%] after:w-[45%] after:h-[75%] after:content-[''] after:bg-gradient-to-r after:from-[rgb(142,110,255)] after:to-[rgb(208,195,255)] after:rounded-full after:absolute after:z-1 after:top-[60%] after:left-[-25%]">
          <div className="flex justify-between items-center z-20">
            <div className="text-2xl font-semibold text-[rgb(241,241,241)] z-20 flex align-middle space-x-[5px]">
              <Link to={`/board/${boardId}`}>
                <div className="text-[16px] text-slate-300 ">
                  {board?.title}
                </div>
              </Link>
              <span className="m-0 text-[rgba(0,0,0,0.29)]">⪢</span>
              {editMode ? (
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="text-[16px] text-black bg-transparent border-[1px] outline-none"
                />
              ) : (
                list?.title
              )}
            </div>
            <div className="flex space-x-[5px]">
              {editMode ? (
                <>
                  <ButtonRight onClick={editList} />
                  <ButtonCancel onClick={() => setEditMode(false)} />
                </>
              ) : (
                <ButtonEdit onClick={() => setEditMode(true)} />
              )}
              <ButtonDel onClick={() => deleteList(list._id)} />
            </div>
          </div>
          {/* <p className="text-sm text-[rgb(241,241,241)] z-20">
            {list?.description}
          </p> */}
          <hr className="z-40" />
          <div className=" m-0 absolute top-16 right-4 z-40">
            <ButtonModrn
              text="Create"
              color="blue"
              onClick={() => createCard()}
            />
          </div>
          {/* Cards Section */}
          <div className="w-full relative flex flex-wrap z-20">
            {cards?.map((card) => (
              <Link
                to={`/card/${listId}/${card._id}`}
                key={card._id}
                state={{ boardId }}
              >
                <div className="ag-courses_item">
                  <p className="tag">{card?.labels}</p>
                  <div className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">{card?.title}</div>
                    <div className="ag-courses-item_date-box">
                      {card?.description}
                    </div>
                    <div className="ag-courses-item_date-box">
                      dueDate:
                      <span className="ag-courses-item_date">
                        {" "}
                        {card?.dueDate}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ListDetails;
