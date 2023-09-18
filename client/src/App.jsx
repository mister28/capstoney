import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./components/Navbar";
import Error from "./Error";
import Register from "./Register";
import EditProfile from "./EditProfile";
import Chirp from "./components/Chirp";
import ProfileChirp from "./components/ProfileChirp";

const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
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
        element: <ProfileChirp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signout",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/chirp",
        element: <Chirp />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
