import { create } from "zustand";

const useWindowStore = create((set) => ({
  windows: [],

  wallpaper:
    typeof window !== "undefined"
      ? localStorage.getItem("meowos-wallpaper") ||
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=80"
      : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=80",

  setWallpaper: (url) => {
    localStorage.setItem("meowos-wallpaper", url);
    set({ wallpaper: url });
  },

  openWindow: (app) =>
    set((state) => {
      const existing = state.windows.find((w) => w.id === app.id);
      if (existing) {
        return {
          windows: state.windows.map((w) =>
            w.id === app.id ? { ...w, minimized: false } : w,
          ),
        };
      }

      const offset = state.windows.length * 24;
      return {
        windows: [
          ...state.windows,
          {
            id: app.id,
            title: app.title,
            component: app.component,
            x: 100 + offset,
            y: 80 + offset,
            width: 600,
            height: 400,
            minimized: false,
            zIndex: state.windows.length + 1,
          },
        ],
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w,
        zIndex: w.id === id ? state.windows.length + 1 : w.zIndex,
      })),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w,
      ),
    })),
}));

export default useWindowStore;
