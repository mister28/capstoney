// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Feed from './pages/Feed'

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Explore from "./Explore";
import Login from "./Login";
import Navbar from './components/Navbar';
import Error from './Error';
import Register from './Register';
import EditProfile from './EditProfile'

const Layout = () => {
  return (
    <div className='md:w-8/12 mx-auto'>
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/", // the main home page that'll display the feed
        element: <Home />,
      },
      {
        path: "/profile", // display the profile based on the user's specific ID
        element: <Profile />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signout",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile/edit/Username",
        element: <EditProfile />
      }
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Feed/>}/>
    //   </Routes>
    // </Router>

    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
