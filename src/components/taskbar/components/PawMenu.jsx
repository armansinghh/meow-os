"use client"
import { motion } from "framer-motion"
import { FaCat } from "react-icons/fa6"
import { FiX } from "react-icons/fi"
import apps from "@/apps"
import useWindowStore from "@/store/useWindowStore"

export default function PawMenu({ onClose }) {
  const { openWindow, windows, minimizeWindow } = useWindowStore()

  const handleAppClick = (app) => {
    const isOpen = windows.find((w) => w.id === app.id)
    if (isOpen) minimizeWindow(app.id)
    else openWindow(app)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-14 left-4 w-56 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col gap-4 text-white shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCat className="text-lg" />
          <span className="text-sm font-bold tracking-wide">meowOS</span>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition">
          <FiX />
        </button>
      </div>

      {/* App list */}
      <div className="flex flex-col gap-1">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/15 transition text-sm text-left"
          >
            <span className="text-base">{app.icon}</span>
            <span>{app.title}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}