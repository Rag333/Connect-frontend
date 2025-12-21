import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = ({ request }) => {
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
    <div>
      <div>
        <div className="card bg-base-200 w-96  shadow-sm m-5">
          <figure className="px-10 pt-7">
            <img
              src={photoUrl}
              alt="Shoes"
              className="rounde h-80 w-80 rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && (
              <p>
                {age}, {gender}
              </p>
            )}
            <div className="flex justify-between gap-15">
              <button
                className="btn btn-success"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept ✅
              </button>
              <button
                className="btn btn-error"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject ❌
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
