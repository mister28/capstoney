import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";

const EditProfile = () => {
  const id = useParams();
  const [EditProfileForm, setEditProfileForm] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const [UserInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const nav = useNavigate();
  
  useEffect(() => {

    fetch(`http://localhost:3099/api/profile/edit/Username`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setUserInfo(response);
      });
    //return () => setEditProfileForm([]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend with the form data
      const response = await fetch(

        "http://localhost:3099/api/profile/edit/Username",
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
        nav("/");
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
        "http://localhost:3099/api/delete/id",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
    //console.log("UserInfo", UserInfo)
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10"
      >
        <p className="text-center text-xl">Edit User</p>
        <input
          name="firstName"
          placeholder="First Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo?.firstName ? UserInfo?.firstName : ""}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo?.lastName}
        />
        <input
          name="Email"
          type="email"
          placeholder="email"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo?.Email}
        />
        <input
          name="Username"
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo?.Username}
        />
        <input
          name="Password"
          type="password"
          placeholder="password"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setProfileState(e)}
          value={UserInfo?.Password}
        />
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
      <br></br>
      <button
        onClick={SubmitDelete}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit"
      >
        Delete this User
      </button>
    </>
  );
};

export default EditProfile;
