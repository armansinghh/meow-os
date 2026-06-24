"use client"
import { useEffect, useState } from "react"
import useWindowStore from "@/store/useWindowStore"
import Window from "@/components/windows/Window"
import Taskbar from "@/components/taskbar/Taskbar"
import { AnimatePresence } from "framer-motion"
import DraggableWidget from "./widgets/DraggableWidget"
import CatFactWidget from "./widgets/CatFactWidget"
import ClockWidget from "./widgets/ClockWidget"
import StickyNoteWidget from "./widgets/StickyNoteWidget"
import RandomCatWidget from "./widgets/RandomCatWidget"

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)
  const wallpaper = useWindowStore((state) => state.wallpaper)

  const [mounted, setMounted] = useState(false)
  // New state to track if the browser has physically finished downloading the pixels
  const [isWallpaperReady, setIsWallpaperReady] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#050505]">

      {mounted && wallpaper && (
        <img
          src={wallpaper}
          alt="wallpaper-tracker"
          className="absolute w-px h-px opacity-0 pointer-events-none -z-50"
          onLoad={() => setIsWallpaperReady(true)}
          onError={() => setIsWallpaperReady(true)} // Failsafe: If the image URL breaks, boot the OS anyway
        />
      )}

      {/* --- THE OS LAYER --- */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isWallpaperReady ? "opacity-100" : "opacity-0"
          }`}
        style={{ backgroundImage: `url(${wallpaper})` }}
      >

        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

        {/* LAYER 1: Widgets */}
        {mounted && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <DraggableWidget id="clock-v3" defaultX={20} defaultY={20}>
              <ClockWidget />
            </DraggableWidget>
            <DraggableWidget id="sticky-v3" defaultX={window.innerWidth - 276} defaultY={20}>
              <StickyNoteWidget />
            </DraggableWidget>
            <DraggableWidget id="randomcat-v3" defaultX={window.innerWidth - 276} defaultY={208}>
              <RandomCatWidget />
            </DraggableWidget>
            <DraggableWidget id="catfact-v3" defaultX={window.innerWidth - 276} defaultY={458}>
              <CatFactWidget />
            </DraggableWidget>
          </div>
        )}

        {/* LAYER 2: App Windows */}
        <div className="absolute inset-0 z-30 pointer-events-none *:pointer-events-auto">
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

        {/* LAYER 3: Taskbar */}
        <div className="absolute inset-x-0 bottom-0 z-50 pointer-events-none *:pointer-events-auto">
          <Taskbar />
        </div>

      </div>
    </div>
  )
}