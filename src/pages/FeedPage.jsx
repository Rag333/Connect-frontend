import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserFeedCard from "../components/UserFeedCard";

const FeedPage = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) {
    return;
  }

  if (feed.length === 0) {
    return (
      <div className="font-semibold flex justify-center m-5 text-red-600">
        No New User Found !!!
      </div>
    );
  }
  return (
    feed && (
      <div className=" flex justify-center my-14">
        <UserFeedCard user={feed[0]} />
      </div>
    )
  );
};

export default FeedPage;
