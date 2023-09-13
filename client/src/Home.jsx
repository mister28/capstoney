import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import MainFeed from "./components/MainFeed";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Home = () => {
  let Auth = useSelector((state) => state.auth.isAuthenticated);
  console.log(Auth);
  const User = useSelector((state) => state.user);
  console.log(User.values.firstName);

  return (
    <>
      {Auth ? (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainFeed />
          </div>
          <div className="px-6">
            {" "}
            <RightSidebar />{" "}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log In
            </Link>
          </p>
          <br></br>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
