import React from "react";
import LeftSidebar from "./components/LeftSidebar";
// import RightSidebar from "./components/RightSidebar";
import { useSelector} from "react-redux";
import {useState, useEffect } from 'react'
import Chirp from "./components/Chirp";
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let Auth = useSelector((state) => state.auth.isAuthenticated);
  const User = useSelector((state) => state.user.values);
  const navigate = useNavigate();

  const [chirps, setChirps] = useState([]);
  const [ChirpForm, setChirpForm] = useState({
    Content: "",
  });

  const setChirpState = (e) => {
    setChirpForm({
      ...ChirpForm,
      [e.target.name]: e.target.value,
      Username: `${User.Username}`,

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://chirper-o3zr.onrender.com/api/mainfeed", {
        method: "POST",
        body: JSON.stringify(ChirpForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();

      setChirpForm({ Content: "" });
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    fetch(`https://chirper-o3zr.onrender.com/api/mainfeed/id`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setChirps(response);
      });
      if (!Auth) {
        // Use navigate inside the useEffect to avoid rendering-related issues
        navigate('/login');
      }
  }, []);

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="">
            <form onSubmit={handleSubmit} className="border-b-2 pb-6">
              <input
                name="Content"
                type="text"
                placeholder="What's on your mind?"
                className="bg-slate-200 rounded-lg w-full p-2"
                onChange={(e) => setChirpState(e)}
                value={ChirpForm.Content}
              />

              <p className="text-2xl font-bold pl-2 my-2 text-blue-500" style={{ WebkitTextStroke: '.25px black', color: '#3b82f6' }} >{User.Username}</p>

              <br />
              <button className="bg-blue-500 text-white py-1 px-4 rounded-full ml-auto">
                Chirp
              </button>
            </form>
            <div className="container mx-auto max-w-[600px]">
              <Chirp toggle={toggle} setToggle={setToggle} />
            </div>
          </div>
          <div className="px-6">
          </div>
        </div>


    </>
  );
};

export default Home;
