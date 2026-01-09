import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      console.log("PROFILE API RESPONSE:", res.data);
      dispatch(addUser(res.data.data)); // ✅ CORRECT
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-20">
        Unauthorized or session expired. Please login again.
      </div>
    );
  }

  return <EditProfile user={user} />;
};

export default Profile;
