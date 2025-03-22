import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAotfzfVRDD3fEo_AFfMg2eZHcjARkPdfM",
  authDomain: "servioauth.firebaseapp.com",
  projectId: "servioauth",
  storageBucket: "servioauth.firebasestorage.app",
  messagingSenderId: "644811193912",
  appId: "1:644811193912:web:4a6bdc1740356a9423b0cd",
  measurementId: "G-Y7GWQD32CS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);