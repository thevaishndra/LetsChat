import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  //check user authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");

      set({ authUser: res.data });
      get().connectSocket(); //connect to websocket if user is authenticated
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null }); //logs the user out
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //user signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket(); //connect web socket after signup
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //user login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket(); //connects web socket after login
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //user logout
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket(); //disconnect web socket on logout
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //user update profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //connects authenticated user to web socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    //establish a new web socket connection with server
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id, //sends userid to identify
      },
    });

    socket.connect(); //connects the socket

    set({ socket: socket });

    // Event listener for online users
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  //disconnect socket called during logout
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
