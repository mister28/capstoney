import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "./components/LeftSidebar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";
import { changeProfile } from "./redux/reducers/userSlice";

const EditProfile = () => {
  const [UserInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const User = useSelector((state) => state.user.values);
  let Auth = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();
  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const Dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.user)
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
} catch  (error)  {
  console.log(error)
}

Dispatch(changeProfile(downloadURL));
   });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3099/api/profile/edit/${User.Username}`,
        {
          method: "POST",
          body: JSON.stringify(UserInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response from the backend (e.g., show a success message)
      const data = await response.json();
      if (response.ok) {
        nav("/profile/");
      } else {
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error:", error);
    }
  };

  const SubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3099/api/delete/${User.Username}`,
        {
          method: "DELETE",
        }
      );
      nav("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const setProfileState = (e) => {
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <>
      {Auth ? (
        <div className="flex justify-between">
          <div className="px-6">
            <LeftSidebar />
          </div>

          <div className="col-span-1 md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-auto mx-auto gap-10"
            >
              <p className="text-center text-xl font-bold text-center">
                Edit Profile
              </p>

              <p className="text-center">Choose a new profile photo</p>
              {imgUploadProgress > 0 ? (
                "Uploading " + imgUploadProgress + "%"
              ) : (
                <input
                  type="file"
                  className="bg-transparent border border-slate-500 rounded p-2"
                  accept="image"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              )}

              <label className="text-xl py-2 rounded-full px-4">
                {" "}
                First Name :
                <input
                  name="firstName"
                  placeholder={User.firstName}
                  required
                  className="text-xl py-2 rounded-full px-4"
                  onChange={(e) => setProfileState(e)}
                  value={UserInfo.firstName}
                />
              </label>
              <label className="text-xl py-2 rounded-full px-4">
                {" "}
                Last Name :
                <input
                  name="lastName"
                  type="text"
                  placeholder={User.lastName}
                  required
                  className="text-xl py-2 rounded-full px-4"
                  onChange={(e) => setProfileState(e)}
                  value={UserInfo.lastName}
                />
              </label>
              <label className="text-xl py-2 rounded-full px-4">
                {" "}
                Email :
                <input
                  name="Email"
                  type="email"
                  placeholder={User.Email}
                  required
                  className="text-xl py-2 rounded-full px-4"
                  onChange={(e) => setProfileState(e)}
                  value={UserInfo.Email}
                />
              </label>
              <label className="text-xl py-2 rounded-full px-4">
                {" "}
                Username :
                <input
                  name="Username"
                  type="text"
                  placeholder={User.Username}
                  className="text-xl py-2 rounded-full px-4"
                  onChange={(e) => setProfileState(e)}
                  value={UserInfo.Username}
                />
              </label>
              <label className="text-xl py-2 rounded-full px-4">
                {" "}
                Password :
                <input
                  name="Password"
                  type="password"
                  placeholder="New Password"
                  className="text-xl py-2 rounded-full px-4"
                  onChange={(e) => setProfileState(e)}
                  value={UserInfo.Password}
                />
              </label>
              <button
                className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                type="submit"
              >
                Save Changes
              </button>
              <button
                onClick={SubmitDelete}
                className="text-xl py-2 rounded-full px-4 bg-red-500 text-white"
                type="submit"
              >
                Delete your Account
              </button>
            </form>
          </div>
          <br></br>
          <br></br>
        </div>
      ) : (
        nav("/login")
      )}
    </>
  );
};

export default EditProfile;
