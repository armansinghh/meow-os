"use client"
import { Rnd } from "react-rnd"
import { motion } from "framer-motion"
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi"
import useWindowStore from "@/store/useWindowStore"
import { useEffect, useState } from "react"

export default function Window({ id, title, children, x, y, width, height, zIndex, maximized }) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore()
  const [screenSize, setScreenSize] = useState({ width: 1280, height: 720 })

  useEffect(() => {
    const update = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const maxZ = Math.max(...windows.map((w) => w.zIndex))
  const isFocused = zIndex === maxZ

  return (
    <Rnd
      default={{ x, y, width, height }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: screenSize.width, height: screenSize.height - 48 } : undefined}
      minWidth={300}
      minHeight={200}
      style={{ zIndex, transition: maximized ? "all 0.2s ease" : "none" }}
      disableDragging={maximized}
      enableResizing={!maximized}
      onMouseDown={() => focusWindow(id)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{ transition: "width 0.2s ease, height 0.2s ease" }}
        className={`w-full h-full rounded-xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-150 ${isFocused ? "border-white/60" : "border-white/20 opacity-90"
          }`}
      >
        {/* Title bar */}
        <div className={`flex items-center justify-between px-3 h-9 border-b transition-all duration-150 ${isFocused ? "bg-white/90 border-gray-200" : "bg-white/50 border-gray-200/50"}`}>
          <span className="text-sm font-semibold text-gray-700">{title}</span>

          {/* Window controls */}
          <div className="flex items-stretch h-full -mr-3">
            <button
              onClick={() => minimizeWindow(id)}
              className="px-4 h-full flex items-center justify-center hover:bg-black/10 transition text-gray-500 hover:text-gray-800"
            >
              <FiMinus size={13} />
            </button>
            <button
              onClick={() => maximizeWindow(id)}
              className="px-4 h-full flex items-center justify-center hover:bg-black/10 transition text-gray-500 hover:text-gray-800"
            >
              <FiMaximize2 size={13} />
            </button>
            <button
              onClick={() => closeWindow(id)}
              className="px-4 h-full flex items-center justify-center hover:bg-red-500 hover:text-white transition text-gray-500 rounded-tr-xl"
            >
              <FiX size={13} />
            </button>
          </div>
        </div>

        {/* App content */}
        <div className="flex-1 overflow-auto p-3 bg-white">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}