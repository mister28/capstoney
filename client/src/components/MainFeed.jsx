import React from "react";
import Chirp from "../components/Chirp";

const MainFeed = () => {
  return (
    <div>
      <p className="font-bold pl-2 my-2">Username</p>
      <form className="border-b-2 pb-6">
        <textarea
          type="text"
          placeholder="What's on your mind?"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
          Chirp
        </button>
      </form>

      <div className="container mx-auto max-w-[600px]">
        <Chirp />
        <Chirp />
        <Chirp />
        <Chirp />
      </div>
      
    </div>
  );
};

export default MainFeed;
