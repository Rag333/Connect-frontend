import React from "react";

const ConnectionCard = ({ connection, idx }) => {
  return (
    <div className="rounded-2xl m-2 p-2 flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md w-full">
        <li className="list-row flex items-center gap-4 hover:bg-base-200 transition">
          {/* Index */}
          <div className="text-2xl tabular-nums opacity-50">{idx}</div>

          {/* Avatar */}
          <img
            className="size-10 rounded-box"
            src={connection.photoUrl || "/default-avatar.png"}
            alt={`${connection.firstName} profile`}
          />

          {/* User Info */}
          <div className="list-col-grow">
            <div className="font-medium">
              {connection.firstName} {connection.lastName}
            </div>
            <div className="text-xs opacity-60">{connection.about}</div>
          </div>

          {/* Chat Button */}
          <button className="btn btn-outline btn-sm ml-auto">Chat 💬</button>
        </li>
      </ul>
    </div>
  );
};

export default ConnectionCard;
