import React from "react";

const UserFeedCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, photoUrl, about } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="User Photo" className="h-90 w-100" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{skills}</p>
        <p>{about}</p>

        <div className="card-actions justify-between mx-3">
          <button className="btn btn-secondary ">Ignore </button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
