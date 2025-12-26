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
    <div>
      <h1 className=" font-bold text-2xl text-center m-8 "> Requests </h1>

      <div className="flex flex-wrap">
        {requests.map((request) => (
          <div key={request._id} className="flex-row items-start m-8 ">
            {<RequestCard request={request} requestId={request._id} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
