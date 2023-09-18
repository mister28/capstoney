import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import app from "./firebase";
import { changeProfile } from "./redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const Dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // switch (error.code) {
        //   case 'storage/unauthorized':
        //     // User doesn't have permission to access the object
        //     break;
        //   case 'storage/canceled':
        //     // User canceled the upload
        //     break;
        //   // ...
        //   case 'storage/unknown':
        //     // Unknown error occurred, inspect error.serverResponse
        //     break;
        //     default:
        //       break;
        // }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await fetch(`/users/${currentUser._id}`, {
              profilePicture: downloadURL,
            });
          } catch (error) {
            console.log(error);
          }

          Dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

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

  const [profilePhoto, setProfilePhoto] = useState(null);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10"
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

        {/* <p className="text-center text-l text-center">
          Upload your profile photo
        </p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            name="Profile Photo"
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )} */}

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
