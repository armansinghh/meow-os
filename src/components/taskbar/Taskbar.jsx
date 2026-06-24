"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useWindowStore from "@/store/useWindowStore"
import apps from "@/apps"
import { FaPaw } from "react-icons/fa6"
import SystemTray from "./components/SystemTray"
import TrayModal from "./components/TrayModal"
import PawMenu from "./components/PawMenu"

export default function Taskbar() {
  const { openWindow, windows, minimizeWindow, focusWindow } = useWindowStore()
  const [trayOpen, setTrayOpen] = useState(false)
  const [pawOpen, setPawOpen] = useState(false)

  const handleAppClick = (app) => {
    const win = windows.find((w) => w.id === app.id)

    if (!win) {
      openWindow(app)
    } else {
      if (win.minimized) {
        minimizeWindow(app.id)
        focusWindow(app.id)
      } else {
        const maxZ = Math.max(...windows.map((w) => w.zIndex), 0)
        if (win.zIndex === maxZ) {
          minimizeWindow(app.id)
        } else {
          focusWindow(app.id)
        }
      }
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-50 pointer-events-none">
      
      <AnimatePresence>
        {/* pointer-events-auto allows the modals to be clicked */}
        {trayOpen && (
          <div className="pointer-events-auto">
            <TrayModal key="tray" onClose={() => setTrayOpen(false)} />
          </div>
        )}
        {pawOpen && (
          <div className="pointer-events-auto">
            <PawMenu key="paw" onClose={() => setPawOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center px-4 pointer-events-auto selection:bg-transparent">

        {/* Left — paw */}
        <div className="flex-1 flex items-center">
          <button
            onClick={() => { setPawOpen(!pawOpen); setTrayOpen(false) }}
            className={`w-9 h-9 rounded-lg transition flex items-center justify-center outline-none ${pawOpen ? "bg-white/20" : "hover:bg-white/20"
              }`}
          >
            <FaPaw className={`text-lg transition-colors ${pawOpen ? "text-white opacity-100" : "text-white opacity-80"}`} />
          </button>
        </div>

        {/* Middle — app icons with dot indicators */}
        <div className="flex items-center gap-2">
          {apps.map((app) => {
            const win = windows.find((w) => w.id === app.id)
            const isOpen = !!win
            const isMinimized = win?.minimized
            const maxZ = Math.max(...windows.map((w) => w.zIndex), 0)
            const isFocused = isOpen && !isMinimized && win.zIndex === maxZ

            return (
              <div key={app.id} className="flex flex-col items-center gap-0.5">
                <div className="w-1 h-1" /> {/* Top Spacer */}
                <button
                  onClick={() => handleAppClick(app)}
                  className={`w-9 h-9 rounded-lg transition flex items-center justify-center text-white text-base outline-none ${isFocused
                      ? "bg-white/30"
                      : isOpen
                        ? "bg-white/10 hover:bg-white/25"
                        : "hover:bg-white/10"
                    }`}
                  title={app.title}
                >
                  {app.icon}
                </button>
                {/* Dot indicator */}
                <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isOpen
                    ? isMinimized
                      ? "bg-white/40"
                      : "bg-white"
                    : "bg-transparent"
                  }`} />
              </div>
            )
          })}
        </div>

        {/* Right — system tray */}
        <div className="flex-1 flex items-center justify-end">
          <SystemTray onOpen={() => { setTrayOpen(!trayOpen); setPawOpen(false) }} />
        </div>

      </div>
    </div>
  )
}