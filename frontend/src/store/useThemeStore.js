import { create } from "zustand";

export const useThemeStore = create((set) => ({
  //defining theme state
  theme: localStorage.getItem("chat-theme") || "retro",
  //saves the selcted theme and updates it
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },//it automatically re-renders when the theme changes
}));
//custom hook that allows components to access and modify the theme state