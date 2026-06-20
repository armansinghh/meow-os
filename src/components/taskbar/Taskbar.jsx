"use client"
import { useState, useEffect } from "react"
import useWindowStore from "@/store/useWindowStore"
import apps from "@/apps"
import { FaPaw } from "react-icons/fa6"
import { FiWifi, FiBattery } from "react-icons/fi"

export default function Taskbar() {
  const { openWindow, windows, minimizeWindow } = useWindowStore()
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAppClick = (app) => {
    const isOpen = windows.find((w) => w.id === app.id)
    if (isOpen) minimizeWindow(app.id)
    else openWindow(app)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center px-4">
      
      {/* Left — paw */}
      <div className="flex-1 flex items-center">
        <FaPaw className="text-white text-lg opacity-80" />
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
      <div className="flex-1 flex items-center justify-end gap-3 text-white/80">
        <FiWifi className="text-base" />
        <FiBattery className="text-base" />
        <span className="text-xs font-medium tracking-wide">{time}</span>
      </div>

    </div>
  )
}