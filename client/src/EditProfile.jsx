import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import LeftSidebar from './components/LeftSidebar'

const EditProfile = () => {
  const [UserInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const User = useSelector((state) => state.user.values);
  let Auth = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3099/api/profile/edit/${User.Username}`,
        {
          method: "POST",
          body: JSON.stringify(UserInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response from the backend (e.g., show a success message)
      const data = await response.json();
      if (response.ok) {
        nav("/profile/");
      } else {
        console.log("didnt work");
      }
      console.log("Response from backend:", data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error:", error);
    }
  };

  const SubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3099/api/delete/${User.Username}`,
        {
          method: "DELETE"
        }
      );
        nav("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const setProfileState = (e) => {
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    {Auth ? (
      <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10"
      >
        <p className="text-center text-xl">Edit User</p>
        <label className="text-xl py-2 rounded-full px-4"> First Name :  
        <input
          name="firstName"
          placeholder={User.firstName}
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo.firstName}
        />
        </label>
        <label className="text-xl py-2 rounded-full px-4"> Last Name :  
        <input
          name="lastName"
          type="text"
          placeholder={User.lastName}
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo.lastName}
        />
        </label>
        <label className="text-xl py-2 rounded-full px-4"> Email :  
        <input
          name="Email"
          type="email"
          placeholder={User.Email}
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo.Email}
        />
        </label>
       <label className="text-xl py-2 rounded-full px-4"> Username :  
        <input
          name="Username"
          type="text"
          placeholder={User.Username}
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo.Username}
        />
        </label>
        <label className="text-xl py-2 rounded-full px-4"> Password :  
        <input
          name="Password"
          type="password"
          placeholder='New Password'
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo.Password}
        />
        </label>
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit">
          Save Changes
        </button>
      <button
        onClick={SubmitDelete}
        className="text-xl py-2 rounded-full px-4 bg-red-500 text-white"
        type="submit"
      >
        Delete your Account
      </button>
      </form>
      <br></br>
      <br></br>
      </div>
      ) : (
        nav('/login')
      )}
    </>
  );
};

export default EditProfile;
