"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FaCat, FaPowerOff } from "react-icons/fa6"
import { FiSearch } from "react-icons/fi"
import { useRouter } from "next/navigation"
import apps from "@/apps"
import useWindowStore from "@/store/useWindowStore"

export default function PawMenu({ onClose }) {
  const router = useRouter()
  const { openWindow, windows, minimizeWindow, focusWindow } = useWindowStore()
  const [searchQuery, setSearchQuery] = useState("")
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleShutdown = () => {
    sessionStorage.removeItem("meowos-booted")
    router.push("/shutdown")
  }

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
    onClose()
  }

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      // This exit animation now works perfectly thanks to AnimatePresence
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute bottom-16 left-4 w-80 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-110"
    >
      {/* SEARCH BAR AREA */}
      <div className="p-4 pb-2">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 text-white/50 text-sm" />
          <input
            autoFocus
            type="text"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Removed focus rings and purple borders. Pure monochrome.
            className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:bg-black/50 focus:border-white/20 transition-all shadow-inner placeholder:text-white/40"
          />
        </div>
      </div>

      {/* APP GRID */}
      <div className="p-4 pt-2 min-h-55">
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 px-1">
          Pinned Apps
        </div>
        
        {filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-white/40 text-sm">
            <FaCat className="text-3xl mb-3 opacity-20" />
            No apps found
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 text-white/70">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl transition-all duration-200 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-105 border border-white/10">
                  {app.icon}
                </div>
                <span className="text-xs font-medium group-hover:text-white truncate w-full text-center transition-colors">
                  {app.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM PROFILE & POWER BAR */}
      <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-sm">
            <FaCat className="text-white/70 text-sm" />
          </div>
          <span className="text-sm font-medium tracking-wide text-white/70">Guest Cat</span>
        </div>

        <button
          onClick={handleShutdown}
          title="Shut Down"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-red-400 transition-colors outline-none"
        >
          <FaPowerOff className="text-sm" />
        </button>
      </div>
    </motion.div>
  )
}