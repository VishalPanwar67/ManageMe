import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  ActiveLog,
  Profile,
  BoardOut,
  ButtonCall,
} from "../../components/index.component.js";
import { formatDate } from "../../utils/indexUtils.js";

const homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState(null);
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/api/auth/me", {});
        setUser(response.data.data);
        // console.log("get user home", response.data.data);
        if (response.status === 201) {
          return true;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        return false;
      }
    };

    const fetchBoards = async () => {
      try {
        const response = await axios.get("/api/board");
        setBoards(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchActivity = async () => {
      try {
        const response = await axios.get("/api/activityLog");
        // console.log(response.data.data);
        setActivity(response.data.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching activity", error);
      }
    };
    fetchUser();
    fetchBoards();
    fetchActivity();
  }, []);

  const logOut = async () => {
    try {
      const response = await axios.post("/api/api/auth/logout", {});
      if (response.status === 200) {
        // console.log("Logout successful. Redirecting...");
        navigate("/login");
        return true;
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  };

  // console.log(activity);
  return (
    <>
      <div className="w-full flex h-screen  justify-center bg-purple-600">
        <div className=" w-[25vw] flex flex-col ">
          {/* Profile section */}
          <div className=" h-[80vh] flex justify-center pt-2">
            {user && (
              <Profile
                name={user.username}
                email={user.email}
                createdAt={user.createdAt}
              />
            )}
          </div>
          {/* comments section */}
          <div className="h-[50vh] p-2  flex flex-col justify-between">
            <div></div>{" "}
            <div className=" h-12 flex justify-start">
              <ButtonCall
                text="Log Out"
                color="red"
                pgColor="purple-600"
                onClick={logOut}
              />
            </div>
          </div>
        </div>
        {/* Board section */}
        <div className=" w-[50vw] flex flex-col">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-[#434955] text-center mt-5">
              Boards
            </h1>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
          <div
            className=" flex flex-wrap gap-3 overflow-y-scroll overflow-x-hidden p-3 "
            style={{
              alignItems: "center",
              scrollbarColor: "rgba(238, 130, 238, 0.2) transparent",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            {boards &&
              boards.map((board) => (
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
        {/* Active log section */}
        <div className="  w-[25vw] ">
          {error && <p className="text-red-500">{error.message}</p>}
          <div
            className="flex flex-col gap-1 pt-5 h-[98vh] overflow-y-scroll overflow-x-hidden 
                        "
            style={{
              alignItems: "center",
              scrollbarColor: "rgba(238, 130, 238, 0.2) transparent",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            {activity &&
              activity.map((activity) => (
                <ActiveLog
                  key={activity._id}
                  title={activity.activityContext.details.title}
                  type={activity.activityContext.type}
                  actionType={activity.actionType}
                  createdAt={formatDate(activity.createdAt)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default homepage;
