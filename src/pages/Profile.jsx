import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const getProfile = async () => {
    const res = await axios(
      BASE_URL + "/profile/view",
      {},
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
