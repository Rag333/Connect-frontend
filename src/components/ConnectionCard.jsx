import { Link } from "react-router-dom";

const ConnectionCard = ({ connection, idx }) => {
  return (
    <div className="rounded-2xl m-2 p-2 flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md w-full">
        <li className="grid grid-cols-[40px_40px_1fr_auto] items-center gap-4 hover:bg-base-200 transition p-3 rounded-box">
          {/* Index */}
          <div className="text-2xl tabular-nums opacity-50">{idx + 1}</div>

          {/* Avatar */}
          <img
            className="size-10 rounded-box object-cover"
            src={connection.photoUrl || "/default-avatar.png"}
            alt={`${connection.firstName || "User"} profile`}
          />

          {/* User Info */}
          <div>
            <div className="font-medium">
              {connection.firstName} {connection.lastName}
            </div>
            <div className="text-xs opacity-60 truncate max-w-xs">
              {connection.about || "No bio available"}
            </div>
          </div>

          {/* Chat Button */}
          <Link to={`/chat/${connection._id}`}>
            <button className="btn btn-outline btn-sm">Chat 💬</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ConnectionCard;
