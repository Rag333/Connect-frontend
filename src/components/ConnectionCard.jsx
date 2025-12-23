import React from "react";

const ConnectionCard = ({ connection }) => {
  return (
    <div>
      <div className="card bg-base-200 w-96  shadow-sm m-5">
        <figure className="px-10 pt-7">
          <img
            src={connection.photoUrl}
            alt="Shoes"
            className="rounde h-80 w-80 rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {connection.firstName + " " + connection.lastName}
          </h2>
          <p>
            {connection.age} {connection.gender}
          </p>
          <p>{connection.about}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
