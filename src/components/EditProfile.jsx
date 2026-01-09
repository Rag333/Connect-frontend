import React, { useEffect, useState } from "react";
import UserFeedCard from "./UserFeedCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  /* 🔁 Sync form when user arrives */
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setGender(user.gender || "");
      setAge(user.age || "");
      setAbout(user.about || "");
      setSkills(user.skills?.join(", ") || "");
    }
  }, [user]);

  /* 💾 Save profile */
  const saveProfile = async () => {
    try {
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          gender,
          about,
          age,
          skills: skillsArray,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);
      setError("");

      setTimeout(() => setShowToast(false), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold">Edit Your Profile</h1>
          <p className="opacity-70 mt-2">
            Update your details and preview your profile in real time
          </p>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* ================= FORM ================= */}
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body space-y-4">
              <h2 className="text-xl font-semibold mb-2">
                Profile Information
              </h2>

              <div className="flex gap-4">
                <input
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                className="input input-bordered"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <div className="flex gap-4">
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male ♂</option>
                  <option value="female">Female ♀</option>
                  <option value="other">Other ⚧</option>
                </select>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>

              <textarea
                className="textarea textarea-bordered"
                placeholder="About you..."
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <input
                className="input input-bordered"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              {error && (
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              )}

              <button
                className="btn btn-primary mt-3 text-lg"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* ================= LIVE PREVIEW ================= */}
          <div className="flex justify-center sticky top-24">
            <UserFeedCard
              user={{
                firstName,
                lastName,
                gender,
                about,
                age,
                skills: skills
                  ? skills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : [],
                photoUrl,
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= TOAST ================= */}
      {showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully 🎉</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
