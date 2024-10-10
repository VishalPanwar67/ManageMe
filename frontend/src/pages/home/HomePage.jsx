import React, { useEffect, useState } from "react";
import axios from "axios";
import { BoardPage } from "../index.Pages.js";
import { ActiveLog } from "../../components/index.component.js";
import { formatDate } from "../../utils/indexUtils.js";

const homepage = () => {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(true);

  useEffect(() => {
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
    fetchActivity();
  }, []);

  // console.log(activity);
  return (
    <>
      <div className="w-full flex h-screen  justify-center bg-purple-600">
        <div className="border-2 border-black w-[25vw] flex flex-col ">
          {/* Profile section */}
          <div className="border-2 border-yellow-500 h-[50vh] ">1</div>
          {/* comments section */}
          <div className="border-2 border-yellow-500 h-[50vh]">1</div>
        </div>
        {/* Board section */}
        <div className="border-2 border-black w-[50vw]">123</div>
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
