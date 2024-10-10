import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ButtonDel, ButtonHome } from "../../components/index.component";

const EditCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { boardId } = location.state || {};
  //   console.log(boardId);

  const { listId, cardId } = useParams();
  const [card, setCard] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState("");
  const [error, setError] = useState(null);

  const formatDateForInput = (date) =>
    new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`/api/card/${listId}/${cardId}`);
        const cardData = response.data.data;
        setCard(cardData);
        setTitle(cardData.title);
        setDescription(cardData.description);
        setDueDate(formatDateForInput(cardData.dueDate));
        setLabels(cardData.labels);
      } catch (error) {
        // console.error("Error fetching card details", error);
      }
    };

    fetchCardDetails();
  }, [listId, cardId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/card/${listId}/${cardId}`, {
        title,
        description,
        dueDate,
        labels,
      });
      // console.log("Card updated successfully");
      // Use boardId to navigate to the correct list
      navigate(`/list/${boardId}/${listId}`, { state: { boardId } }); // Pass boardId as state
    } catch (error) {
      console.error("Error updating card", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/card/${listId}/${cardId}`);
      // console.log("Card deleted successfully");
      // Use boardId to navigate to the correct list
      navigate(`/list/${boardId}/${listId}`, { state: { boardId } }); // Pass boardId as state
    } catch (error) {
      console.error("Error deleting card", error);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full min-h-screen h-auto  bg-purple-900 p-3">
        <ButtonHome />
        <form id="edit-card-form">
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex h-screen items-center justify-center ">
            {/* From Uiverse.io by Yaya12085 */}
            <div className="w-96 rounded-2xl bg-slate-900 ">
              <div className="flex flex-col gap-2 p-8">
                <p className="text-center text-3xl text-gray-300 mb-4">
                  Edit Card
                </p>

                <input
                  className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                  // placeholder="Email"
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                  type="date"
                  value={dueDate}
                  name="dueDate"
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <input
                  className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                  type="text"
                  value={labels}
                  name="labels"
                  onChange={(e) => setLabels(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button
                  className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                  type="submit"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="relative bottom-[550px] left-0 w-[80%] flex justify-end">
          <ButtonDel text="Delete Card" onClick={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default EditCard;
