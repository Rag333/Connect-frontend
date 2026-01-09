"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length === 0) {
    return (
      <>
        <h1 className="flex justify-center items-center m-7  font-bold">
          No Connection Found
        </h1>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-2xl text-center mb-2">Connections</h1>

      <div className="flex flex-col gap-3 w-2/4">
        {connections.map((connection, idx) => (
          <div key={connection._id}>
            <ConnectionCard connection={connection} idx={idx + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connection;
