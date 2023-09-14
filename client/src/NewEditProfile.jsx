import React from 'react'
import LeftSidebar from './components/LeftSidebar'
// import RightSidebar from '../components/RightSidebar'

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Profile = () => {
  const User = useSelector((state) => state.user.values);
  const Auth = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    nav('/Profile')
  };

  return (
    <>
    <form
    onSubmit={handleSubmit}
    className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10"
  >
    <p className="text-center text-xl">Your Profile Info</p>
    <input
      name="firstName"
      placeholder="First Name"
      required
      className="text-xl py-2 rounded-full px-4"
      onChange={(e) => setProfileState(e)}
      value={User.firstName}
    />
    <input
      name="lastName"
      type="text"
      placeholder="Last Name"
      required
      className="text-xl py-2 rounded-full px-4"
      onChange={(e) => setProfileState(e)}
      value={User.lastName}
    />
    <input
      name="Email"
      type="email"
      placeholder="email"
      required
      className="text-xl py-2 rounded-full px-4"
      onChange={(e) => setProfileState(e)}
      value={User.Email}
    />
    <input
      name="Username"
      type="text"
      placeholder="username"
      className="text-xl py-2 rounded-full px-4"
      onChange={(e) => setProfileState(e)}
      value={User.Username}
    />
    <input
      name="Password"
      type="password"
      placeholder="password"
      className="text-xl py-2 rounded-full px-4"
      onChange={(e) => setProfileState(e)}
      value={User.Password}
    />
    <button
      className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
      type="submit">
        Edit
    </button>
  </form>
  
    </>
  );
};

export default Profile;