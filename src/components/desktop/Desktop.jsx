"use client"
import useWindowStore from "@/store/useWindowStore"
import Window from "@/components/windows/Window"
import Taskbar from "@/components/taskbar/Taskbar"
import { AnimatePresence } from "framer-motion"

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)
  const wallpaper = useWindowStore((state) => state.wallpaper)

  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              x={w.x}
              y={w.y}
              width={w.width}
              height={w.height}
              zIndex={w.zIndex}
              maximized={w.maximized}
            >
              <w.component />
            </Window>
          ))}
      </AnimatePresence>
      <Taskbar />
    </div>
  )
}