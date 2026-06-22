"use client"
import { useEffect, useState } from "react"
import useWindowStore from "@/store/useWindowStore"
import Window from "@/components/windows/Window"
import Taskbar from "@/components/taskbar/Taskbar"
import { AnimatePresence } from "framer-motion"

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)
  const wallpaper = useWindowStore((state) => state.wallpaper)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ 
        backgroundImage: mounted ? `url(${wallpaper})` : "none",
        backgroundColor: "#1e1e2e",
      }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full">
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
      </div>

      <div className="relative z-50">
        <Taskbar />
      </div>
    </div>
  )
}