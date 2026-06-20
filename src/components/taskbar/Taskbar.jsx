"use client"
import { useState } from "react"
import useWindowStore from "@/store/useWindowStore"
import apps from "@/apps"
import { FaPaw } from "react-icons/fa6"
import SystemTray from "./components/SystemTray"
import TrayModal from "./components/TrayModal"
import PawMenu from "./components/PawMenu"

export default function Taskbar() {
  const { openWindow, windows, minimizeWindow } = useWindowStore()
  const [trayOpen, setTrayOpen] = useState(false)
  const [pawOpen, setPawOpen] = useState(false)

  const handleAppClick = (app) => {
    const isOpen = windows.find((w) => w.id === app.id)
    if (isOpen) minimizeWindow(app.id)
    else openWindow(app)
  }

  return (
    <>
      {/* Modals */}
      {trayOpen && <TrayModal onClose={() => setTrayOpen(false)} />}
      {pawOpen && <PawMenu onClose={() => setPawOpen(false)} />}

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center px-4">

        {/* Left — paw */}
        <div className="flex-1 flex items-center">
          <button
            onClick={() => { setPawOpen(!pawOpen); setTrayOpen(false) }}
            className="w-9 h-9 rounded-lg hover:bg-white/20 transition flex items-center justify-center"
          >
            <FaPaw className="text-white text-lg opacity-80" />
          </button>
        </div>

        {/* Middle — app icons */}
        <div className="flex items-center gap-2">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 transition flex items-center justify-center text-white text-base"
              title={app.title}
            >
              {app.icon}
            </button>
          ))}
        </div>

        {/* Right — system tray */}
        <div className="flex-1 flex items-center justify-end">
          <SystemTray onOpen={() => { setTrayOpen(!trayOpen); setPawOpen(false) }} />
        </div>

      </div>
    </>
  )
}