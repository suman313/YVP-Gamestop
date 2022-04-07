// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsq5SXSh50qKU-C0M8CVdeW0QS8pOWk6o",
  authDomain: "yvp-gamestop.firebaseapp.com",
  projectId: "yvp-gamestop",
  storageBucket: "yvp-gamestop.appspot.com",
  messagingSenderId: "77843092773",
  appId: "1:77843092773:web:29c2ac305e256afed876cc",
  measurementId: "G-7BGJ67NYPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//connecting to the firebase database
//This will be use throughout the app to store , delete, update datas
const fireDp = getFirestore(app);

//make accessible to other files
export default fireDp;
