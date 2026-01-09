import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserFeedCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;
  const { firstName, lastName, age, gender, skills, photoUrl, about } = user;
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-md hover:shadow-lg transition">
      {/* Image */}
      <figure className="px-4 pt-4">
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={`${firstName} profile`}
          className="h-80 w-80 rounded-2xl object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name */}
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {/* Age + Gender */}
        {age && gender && (
          <div className="flex items-center gap-3 my-1">
            <span className="badge badge-ghost">{age}</span>

            {gender === "male" && (
              <span className="text-lg text-blue-500" title="Male">
                ♂
              </span>
            )}

            {gender === "female" && (
              <span className="text-lg text-pink-500" title="Female">
                ♀
              </span>
            )}

            {gender === "other" && (
              <span className="text-lg text-purple-500" title="Other">
                ⚧
              </span>
            )}
          </div>
        )}

        {/* Skills (ONLY if present) */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span key={skill} className="badge badge-outline text-xs">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* About */}
        <p className={`text-sm opacity-70 ${skills?.length ? "mt-2" : "mt-4"}`}>
          {about}
        </p>

        {/* Actions */}
        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
