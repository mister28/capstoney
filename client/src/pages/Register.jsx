import React, { useState } from "react";
import { Link } from "react-router-dom";


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
    console.log("RegisterForm", RegisterForm)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a POST request to your backend with the form data
        const response = await fetch('http://localhost:3099/api/register', {
            method: 'POST',
            body: JSON.stringify(RegisterForm),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle the response from the backend (e.g., show a success message)
        const data = await response.json()
        console.log('Response from backend:', data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error:', error);
      }
    };
  
  return (
    <>
      {/* Register form */}
      <form onSubmit={handleSubmit} className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
        <p className="text-center text-xl">Register for an account</p>
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
      </form>
<br/>
      <div>
    <p className="text-center" >Already have an account? <Link to="/login" className="text-blue-600">Log In</Link>
    </p>
</div>

    </>
  );
};

export default Register;
