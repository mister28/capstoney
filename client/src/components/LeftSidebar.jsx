import React from "react";
import { Home, Tag, User, Tool } from "react-feather";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div className="mt-6 flex-col space-y-4">
        
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Home fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        
        <Link to="/profile/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <User fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>

        {/* <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Tag fontSize="large" />
            <p>Explore</p>
          </div>
        </Link> */}
        
        <Link to="/profile/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <Tool fontSize="large" />
            <p>Edit Profile</p>
          </div>
        </Link>

      </div>
      <div className="flex justify-between">
        <div>
          {/* <p className="font-bold">Username</p>
          <p className="font-bold">@Username</p> */}
        </div>
        <div>
            <Link to="/login">
                <button className="bg-red-500 px-4 py-2 text-white rounded-full">Logout</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
