import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

// Helper function to parse JSON from localStorage safely
const parseLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
};

const initialState = {
  token: Cookies.get("token") || null,
  isAuthenticated: parseLocalStorageItem("isAuthenticated") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("payloaddd", action.payload);

      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      if (!action.payload.success) {
        // Don't update state if registration failed
        return state;
      }

      // Store authentication state in localStorage
      localStorage.setItem("isAuthenticated", "true"),
        // Store token in cookies
        Cookies.set("token", state.token);

      // Store user email in localStorage if available
      if (action.payload.data.user && action.payload.data.user.email) {
        localStorage.setItem("userEmail", action.payload.data.user.email);
        localStorage.setItem("userId", action.payload.data.user._id);
      } else if (action.payload.email) {
        localStorage.setItem("userEmail", action.payload.email);
        localStorage.setItem("userId", action.payload._id);
      }
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      // Clear authentication state in localStorage
      localStorage.setItem("isAuthenticated", "false");

      // Remove token from cookies
      Cookies.remove("token");

      // Remove user email from localStorage
      localStorage.removeItem("userEmail");
    },

    // Add a new action to manually set user email (useful for Google sign-in)
    setUserEmail: (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        localStorage.setItem("userEmail", action.payload);
      }
    },
  },
});

export const { setToken, logout, setUserEmail } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
