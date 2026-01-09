import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import RequestCard from "../components/RequestCard";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return (
      <>
        <h1 className="flex justify-center items-center m-7  font-bold">
          No Request Found
        </h1>
      </>
    );
  }
  return (
    <div className="flex items-center justify-center  flex-col">
      <h1 className=" font-bold text-2xl text-center  m-4 gap-3  ">
        {" "}
        Requests{" "}
      </h1>

      <div>
        {requests.map((request, idx) => (
          <div key={request._id}>
            {
              <RequestCard
                request={request}
                requestId={request._id}
                idx={idx + 1}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
