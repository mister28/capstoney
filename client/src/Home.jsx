import React from "react";
import LeftSidebar from "./components/LeftSidebar";
// import RightSidebar from "../components/RightSidebar";
import MainFeed from "./components/MainFeed";
import { useSelector } from 'react-redux'


const Home = () => {
  const Auth = useSelector((state) => state.auth);
  console.log(Auth);
  const User = useSelector((state) => state.user);
  console.log(User.values.firstName);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <MainFeed />
        </div>
        <div className="px-6">
          {/* <RightSidebar /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
