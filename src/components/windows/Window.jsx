"use client"
import { Rnd } from "react-rnd"
import { motion } from "framer-motion"
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi"
import useWindowStore from "@/store/useWindowStore"
import { useEffect, useState } from "react"

export default function Window({ id, title, children, x, y, width, height, zIndex, maximized }) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore()
  const [screenSize, setScreenSize] = useState({ width: 1280, height: 720 })
  const [isAnimating, setIsAnimating] = useState(false)

  const handleMaximize = () => {
    setIsAnimating(true)
    maximizeWindow(id)
    setTimeout(() => setIsAnimating(false), 200)
  }

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
      minWidth={width}
      minHeight={height}
      style={{
        zIndex,
        transition: isAnimating ? "width 0.3s ease, height 0.3s ease, transform 0.3s ease-in-out" : "none"
      }}
      disableDragging={maximized}
      enableResizing={!maximized}
      onMouseDown={() => focusWindow(id)}
      dragHandleClassName="window-drag-handle"
      bounds="parent" 
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 0.7, 0.3, 1] }} 
        className={`w-full h-full rounded-xl flex flex-col overflow-hidden border transition-all duration-200 bg-white ${
          isFocused 
            ? "border-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5" 
            : "border-slate-200 shadow-xl opacity-[0.98]"
        }`}
        style={{ 
          transition: isAnimating ? "width 0.3s ease, height 0.3s ease, transform 0.3s ease-in-out" : "none" 
        }}
      >
        <div 
          className={`window-drag-handle relative flex items-center justify-between px-4 h-12 transition-colors duration-200 z-50 ${
            isFocused ? "bg-slate-50/90" : "bg-slate-50/50"
          } backdrop-blur-md border-b border-slate-200`}
          onDoubleClick={handleMaximize}
        >
          {/* Invisible spacer on the LEFT to perfectly center the title */}
          <div className="w-20" />

          {/* Centered App Title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <span className={`text-sm font-semibold tracking-wide transition-colors ${
              isFocused ? "text-slate-700" : "text-slate-400"
            }`}>
              {title}
            </span>
          </div>

          {/* Right-Aligned Traffic Light Controls */}
          <div className="flex items-center justify-end gap-2 group w-20">
            {/* Minimize (Yellow) */}
            <button
              onClick={() => minimizeWindow(id)}
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-colors"
            >
              <FiMinus className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" size={10} strokeWidth={3} />
            </button>
            
            {/* Maximize (Green) */}
            <button
              onClick={handleMaximize}
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-colors"
            >
              <FiMaximize2 className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" size={8} strokeWidth={3} />
            </button>

            {/* Close (Red) - Placed on the far right */}
            <button
              onClick={() => closeWindow(id)}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-colors"
            >
              <FiX className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" size={10} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* APP CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative bg-transparent p-2">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}