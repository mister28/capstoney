// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNfym2nCPF6HJj5F1AcpQ4yN9vjJhj8WM",
  authDomain: "chirper-project.firebaseapp.com",
  projectId: "chirper-project",
  storageBucket: "chirper-project.appspot.com",
  messagingSenderId: "305086012134",
  appId: "1:305086012134:web:3228de596738a33a033927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;