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
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="User Photo"
          className="h-80 w-80 mt-4 rounded-2xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{skills}</p>
        <p>{about}</p>

        <div className="card-actions justify-between mx-3">
          <button
            className="btn btn-secondary "
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore{" "}
          </button>
          <button
            className="btn btn-primary"
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
