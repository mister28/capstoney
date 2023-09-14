import React from "react";
import LeftSidebar from "./components/LeftSidebar";
// import RightSidebar from "./components/RightSidebar";
// import MainFeed from "./components/MainFeed";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useState, useEffect } from 'react'
import Chirp from "./components/Chirp";

const Home = () => {
  let Auth = useSelector((state) => state.auth.isAuthenticated);
  console.log(Auth);
  const User = useSelector((state) => state.user.values);
  console.log(User.Username);

  const [chirps, setChirps] = useState([]);
  // const User = useSelector((state) => state.user.values);
  const [ChirpForm, setChirpForm] = useState({
    Content: "",
    Username: `${User.Username}`,
  });

  const setChirpState = (e) => {
    setChirpForm({
      ...ChirpForm,
      [e.target.name]: e.target.value,
    });
    console.log(ChirpForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend with the form data
      const response = await fetch("http://localhost:3099/api/mainfeed", {
        method: "POST",
        body: JSON.stringify(ChirpForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the response from the backend (e.g., show a success message)
      const data = await response.json();
      console.log("Response from backend:", data);

      // Clear the form after submitting
      setChirpForm({ Content: "" });
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3099/api/mainfeed/id`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setChirps(response);
        console.log("response from backend", response);
      });
  }, []);

  return (
    <>
      {Auth ? (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div>
            <form onSubmit={handleSubmit} className="border-b-2 pb-6">
              <input
                name="Content"
                type="text"
                placeholder="What's on your mind?"
                className="bg-slate-200 rounded-lg w-full p-2"
                onChange={(e) => setChirpState(e)}
                value={ChirpForm.Content}
              />
              <input
                name="Username"
                type="text"
                className="font-bold pl-2 my-2"
                value={`${User.Username}`}
              />
              <br />
              <br />
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
                Chirp
              </button>
            </form>
            <div className="container mx-auto max-w-[600px]">
              <Chirp />
            </div>
          </div>
          <div className="px-6">
            {/* {" "} */}
            {/* <RightSidebar />{" "} */}
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
