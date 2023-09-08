import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  // const [RegisterForm, setRegisterForm] = useState({});

  // const setRegisterState = (e) => {
  //   setRegisterForm({
  //     ...RegisterForm,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(RegisterForm)
  // };

  const [SigninForm, setSigninForm] = useState({
    Username: "",
    Password: "",
  });

  const setSigninState = (e) => {
    setSigninForm({
      ...SigninForm,
      [e.target.name]: e.target.value,
    });
    console.log(SigninForm)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a POST request to your backend with the form data
        const response = await fetch('http://localhost:3099/api/login', {
            method: 'POST',
            body: JSON.stringify(SigninForm),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle the response from the backend (e.g., show a success message)
        const data = await response.json();
        console.log('Response from backend:', data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error:', error);
      }
    };

  return (
    <>
      {/* Signin form */}
      <form onSubmit={handleSubmit} className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">
          Sign in to Chirper
        </h2>

        <input
          name="Username"
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setSigninState(e)}
          value={SigninForm.Username}
        />
        <input
          name="Password"
          type="password"
          placeholder="password"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setSigninState(e)}
          value={SigninForm.Password}
        />
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit"
        >
          Sign in
        </button>
      </form>

      {/* <br /> */}

      {/* Register form */}
      {/* <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
        <p className="text-center text-xl">Don't have an account?</p>
        <input name="firstName"
          type="text"
          placeholder="First Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.firstName}
        />
        <input name="lastName"
          type="text"
          placeholder="Last Name"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.lastName}
        />
        <input name="Email"
          type="email"
          placeholder="email"
          required
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.Email}
        />
        <input name="Username"
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setRegisterState(e)}
          value={RegisterForm.Username}
        />
        <input name="Password"
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
      </form> */}
      <br/>
<div>
    <p className="text-center" >Don't have an account? <Link to="/register" className="text-blue-600">Register</Link> </p>
</div>
    </>


  );
};

export default Signin;
