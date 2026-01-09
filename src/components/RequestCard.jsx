import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = ({ request, idx }) => {
  const dispatch = useDispatch();
  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(request._id));
    } catch (err) {}
  };
  const { photoUrl, age, gender, about, firstName, lastName } =
    request.fromUserId;
  return (
    <div className="rounded-2xl m-2 p-2">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row flex items-center gap-4 hover:bg-base-200 transition">
          {/* Index */}
          <div className="text-3xl font-thin opacity-25 tabular-nums">
            {idx}
          </div>

          {/* Avatar */}
          <img
            className="size-10 rounded-box"
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} profile`}
          />

          {/* User Info */}
          <div className="list-col-grow">
            <div className="font-medium">
              {firstName} {lastName}
            </div>

            <div className="text-xs opacity-70 line-clamp-2">{about}</div>

            {age && gender && (
              <div className="flex items-center gap-3 mt-1">
                <span className="badge badge-ghost text-xs">{age}</span>

                <span className="text-lg">
                  {gender === "male" && (
                    <span className="text-blue-500">♂</span>
                  )}
                  {gender === "female" && (
                    <span className="text-pink-500">♀</span>
                  )}
                  {gender === "other" && (
                    <span className="text-purple-500">⚧</span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center ml-auto">
            <button
              className="btn btn-success btn-sm hover:scale-105 transition"
              onClick={() => reviewRequests("accepted", request._id)}
            >
              Accept
            </button>

            <button
              className="btn btn-error btn-sm hover:scale-105 transition"
              onClick={() => reviewRequests("rejected", request._id)}
            >
              Reject
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RequestCard;
