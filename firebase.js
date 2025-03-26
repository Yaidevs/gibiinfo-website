import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDztfV_42FRBVdNGRjXXktteCKKJKpKZj8",
  authDomain: "farmer-ecommerce-files.firebaseapp.com",
  projectId: "farmer-ecommerce-files",
  storageBucket: "farmer-ecommerce-files.appspot.com",
  messagingSenderId: "716099671539",
  appId: "1:716099671539:web:17cbadb0a6b5926a6e6e86",
  measurementId: "G-47XPTZRBDH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logout = () => signOut(auth);
export { auth };

export const storage = getStorage(app);