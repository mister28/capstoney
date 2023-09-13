import React, { useState, useEffect } from "react";
import { MoreHorizontal, Heart } from "react-feather";

const Chirp = () => {
  const [chirps, setChirps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3099/api/MainFeed/id`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setChirps(response);
        console.log("response from backend", response);
      });
  }, []);

  const [likes, setLikes] = useState({});

  const handleLikeClick = (chirpId) => {
    // Toggle the like status for the chirp
    setLikes((prevLikes) => ({
      ...prevLikes,
      [chirpId]: !prevLikes[chirpId],
    }));
  };

  return (
    <div className="grid place-items-center">
      {chirps.map((item) => (
        <div key={item._id} className="flex p-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://placekitten.com/200/200" // this will be the user's profile photo
            alt="User's profile photo"
          />

          <div className="w-full px-2 pb-4 border-b border-[rgba(49,49,50,1)]">
            {/* Chirps header */}
            <div className="flex justify-between gap-2">
              <strong>Username</strong>

              <div className="flex justify-between gap-2">
                <p className="text-[rgba(97,97,97,1)]">
                  {/* {Chirp.timestamp} */}3 hours ago
                </p>
                <MoreHorizontal />
              </div>
            </div>

            {/* Chirps body */}
            <div className="py-4">
              <span>{item.Content}</span>
            </div>

            <div className="flex gap-4 py-4">
              <Heart
                size={22}
                color={likes[item._id] ? "red" : "black"} // change the color based on whether it's liked or not
                onClick={() => handleLikeClick(item._id)} // Toggle the like when clicked
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="flex gap-4">
              <p className="text-[rgba(97,97,97,1)]">
                {likes[item._id] ? "Liked" : ""}
                {/* 7 Likes */}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chirp;
