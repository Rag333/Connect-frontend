import React, { useEffect, useState } from "react";
import UserFeedCard from "./UserFeedCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, about, age, skills, photoUrl },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex ">
        <div className="flex items-center mx-30 h-160 w-screen">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              value={photoUrl}
              placeholder="Photo"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="label">Gender</label>
            <input
              type="text"
              className="input"
              value={gender}
              placeholder="Gender"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="number"
              className="input"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
            <label className="label">About</label>
            <input
              type="text"
              className="input"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <label className="label">Skills</label>
            <input
              type="text"
              className="input"
              value={skills}
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
            />
            {error && <p className="text-red-600 font-semibold">{error}</p>}

            <button className="btn btn-neutral mt-3" onClick={saveProfile}>
              Save Profile
            </button>
          </fieldset>
        </div>
        <div className="flex items-center mx-60 my-11">
          <UserFeedCard
            user={{ firstName, lastName, gender, about, age, skills, photoUrl }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success">
            <span>Profile Saved successfully !!! </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
