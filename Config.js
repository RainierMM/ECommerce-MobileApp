import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDL2JXXNUbttfO5uPUUdBrv1_uYYDOql-k",
  authDomain: "ecommerce-c21e8.firebaseapp.com",
  projectId: "ecommerce-c21e8",
  storageBucket: "ecommerce-c21e8.appspot.com",
  messagingSenderId: "446665065537",
  appId: "1:446665065537:web:a138141ffb6a915b3632c0",
  measurementId: "G-H5J0D15CLE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
