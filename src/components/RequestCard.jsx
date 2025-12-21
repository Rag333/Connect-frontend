import React from "react";

const RequestCard = ({ request }) => {
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
            <p>{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
