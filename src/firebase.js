import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM1QxZQIEK8TcdRVi_3Tck0JG1QK7N31M",
  authDomain: "dt-sumanapal.firebaseapp.com",
  projectId: "dt-sumanapal",
  storageBucket: "dt-sumanapal.firebasestorage.app",
  messagingSenderId: "761411632486",
  appId: "1:761411632486:web:375d34c36c598116af1ca7",
  measurementId: "G-6ZRJ4Z5Z89"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
