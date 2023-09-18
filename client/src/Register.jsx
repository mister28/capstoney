import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [RegisterForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    Username: "",
    Password: "",
  });

  const setRegisterState = (e) => {
    setRegisterForm({
      ...RegisterForm,
      [e.target.name]: e.target.value,
    });
    console.log("RegisterForm", RegisterForm);
  };

  const navigate = useNavigate();

  useEffect(() => {
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorMessage("Username is Already Taken");
    try {

      const response = await fetch("http://localhost:3099/api/register", {
        method: "POST",
        body: JSON.stringify(RegisterForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      // console.log("Response from backend:", data);
      if (data.Message) {
        // console.log(data.Message);
        setErrorMessage(true)
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error:", error);
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10"
        encType="multipart/form-data" // Add enctype for file uploads
      >
        <p className="text-3xl font-bold text-center">
          Register for an account
        </p>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.firstName}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.lastName}
        />
        <input
          name="Email"
          type="email"
          placeholder="email"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.Email}
        />
        <input
          name="Username"
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.Username}
          />
          {errorMessage && <div className="text-[rgb(225,29,72)] text-center text-xl"> {'Username Already Taken'}</div>}
        <input
          name="Password"
          type="password"
          placeholder="password"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.Password}
        />


        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit"
        >
          Register
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log In
          </Link>
        </p>
      </form>
      <br></br>
    </>
  );
};

export default Register;
