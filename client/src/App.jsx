// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Feed from './pages/Feed'

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Register from './pages/Register';

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
        path: "/profile/:id", // display the profile based on the user's specific ID
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
