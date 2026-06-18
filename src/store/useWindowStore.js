import { create } from "zustand";

const useWindowStore = create((set) => ({
  windows: [],

  wallpaper: "from-pink-300 via-purple-300 to-blue-300",
  setWallpaper: (wallpaper) => set({ wallpaper }),

  openWindow: (app) =>
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id: app.id,
          title: app.title,
          component: app.component,
          x: 100,
          y: 100,
          width: 600,
          height: 400,
          minimized: false,
          zIndex: state.windows.length + 1,
        },
      ],
    })),

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
