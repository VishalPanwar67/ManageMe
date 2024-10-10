import React from "react";

const ActiveLog = ({
  title = "this is new list",
  type = "list",
  actionType = "delete",
  createdAt = "2023-01-01",
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
        <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
          <div className="flex gap-2">
            <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg"></div>
            <div>
              <p className="text-white">
                {actionType} {type}
              </p>
              <p className="text-gray-500">
                {title} at {createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveLog;
