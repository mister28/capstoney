import React, { useState } from "react";
import Chirp from "../components/Chirp";

const MainFeed = () => {
  const [ChirpForm, setChirpForm] = useState({
    Content: "",
  }); // holds chirp text

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
      const response = await fetch("http://localhost:3099/api/MainFeed", {
        method: "POST",
        body: JSON.stringify(ChirpForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the response from the backend (e.g., show a success message)
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error(error);
    }
  };

  return (
    <div>
      <p className="font-bold pl-2 my-2">Username</p>

      <form onSubmit={handleSubmit} className="border-b-2 pb-6">
        <input
          name="Content"
          type="text"
          placeholder="What's on your mind?"
          // maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
          onChange={(e) => setChirpState(e)}
          value={ChirpForm.Content}
        />

        <br/>
        <br/>

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
