import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Success, Failure } from "./redux/reducers/authSlice";
import { fetchUserInfo } from "./redux/reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [LoginForm, setLoginForm] = useState({
    Username: "",
    Password: "",
  });

  const setLoginState = (e) => {
    setLoginForm({
      ...LoginForm,
      [e.target.name]: e.target.value,
    });
    console.log(LoginForm);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const response = await fetch('http://localhost:3099/api/login', {
            method: 'POST',
            body: JSON.stringify(LoginForm),
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
        const data = await response.json();
        console.log('Response from backend:', data);
        if (data.token) {
          const token = 'secretToken'
          dispatch(Success(token));
          dispatch(fetchUserInfo(LoginForm.Username))
          navigate('/', { replace: true });
        } else {
          dispatch(Failure())
        }

      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Error:', error);
      }
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">
          Log in to Chirper
        </h2>

        <input
          name="Username"
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setLoginState(e)}
          value={LoginForm.Username}
        />
        <input
          name="Password"
          type="password"
          placeholder="password"
          className="text-xl py-2 rounded-full px-4"
          onChange={(e) => setLoginState(e)}
          value={LoginForm.Password}
        />
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"

          type="submit">
          Log in
        </button>
    <p className="text-center-xl" >Don't have an account? <Link to="/register" className="text-blue-600">Register</Link> </p>
      </form>

      <br/>
<div>
</div>
    </>
  );
};

export default Login;
