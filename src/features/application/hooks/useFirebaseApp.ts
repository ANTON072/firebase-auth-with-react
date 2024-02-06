// See: https://firebase.google.com/docs/auth/web/start?hl=ja&authuser=0
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOs89nz08JfXMTEVMKeAobr4jnfdn-kS8",
  authDomain: "fir-auth-with-react-19c71.firebaseapp.com",
  projectId: "fir-auth-with-react-19c71",
  storageBucket: "fir-auth-with-react-19c71.appspot.com",
  messagingSenderId: "641069045081",
  appId: "1:641069045081:web:c0686ebdb3286bbb806848",
};

const useFirebaseApp = () => initializeApp(firebaseConfig);

export default useFirebaseApp;
