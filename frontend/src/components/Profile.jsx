import React from "react";
import { formatDate } from "../utils/indexUtils";

const Profile = ({
  img = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  name = "John Doe",
  bio = "DEVELOPER",
  email = "smkys@gmail.com",
  website = "smkydevelopr.com",
  createdAt = "2023-01-01",
}) => {
  return (
    <div>
      <div className="profile-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
        <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1 transition-all duration-300">
          <div>
            <img
              src={img}
              alt={name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="headings text-center leading-4">
          <p className="text-xl font-serif font-semibold text-[#434955]">
            {name}
          </p>
          <p className="text-sm font-semibold text-[#434955]">{bio}</p>
        </div>
        <div className="w-full items-center justify-center flex">
          <ul className="flex flex-col items-start gap-2 pb-3">
            <li className="flex items-center gap-2 border-b-[1.5px] border-b-stone-700 border-dotted">
              <svg
                className="fill-stone-700 group-hover:fill-[#58b0e0]"
                height="15"
                width="15"
                id="mail"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
                  fill="#231f20"
                ></path>
                <path
                  d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
                  fill="#231f20"
                ></path>
              </svg>
              <p>{email}</p>
            </li>
            <li className="flex items-center gap-2 border-b-[1.5px] border-b-stone-700 border-dotted">
              <svg
                className="fill-stone-700 group-hover:fill-[#58b0e0]"
                height="15"
                width="15"
                id="globe"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g data-name="Layer 2">
                  <path
                    data-name="globe"
                    d="M22 12A10 10 0 0 0 12 2a10 10 0 0 0 0 20 10 10 0 0 0 10-10zm-2.07-1H17a12.91 12.91 0 0 0-2.33-6.54A8 8 0 0 1 19.93 11zM9.08 13H15a11.44 11.44 0 0 1-3 6.61A11 11 0 0 1 9.08 13zm0-2A11.4 11.4 0 0 1 12 4.4a11.19 11.19 0 0 1 3 6.6zm.36-6.57A13.18 13.18 0 0 0 7.07 11h-3a8 8 0 0 1 5.37-6.57zM4.07 13h3a12.86 12.86 0 0 0 2.35 6.56A8 8 0 0 1 4.07 13zm10.55 6.55A13.14 13.14 0 0 0 17 13h2.95a8 8 0 0 1-5.33 6.55z"
                  ></path>
                </g>
              </svg>
              <p>{website}</p>
            </li>
            <li className="flex items-center justify-center w-full gap-2 ">
              <small>{formatDate(createdAt)}</small>
            </li>
          </ul>
        </div>
        <hr className="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300" />
      </div>
    </div>
  );
};

export default Profile;
