"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { LuWifi, LuBatteryMedium, LuBluetooth, LuMoon, LuSun, LuVolume2 } from "react-icons/lu"

export default function TrayModal({ onClose }) {
  const modalRef = useRef(null)
  
  const [wifiOn, setWifiOn] = useState(true)
  const [btOn, setBtOn] = useState(false)
  const [dndOn, setDndOn] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute bottom-16 right-4 w-72 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-110"
    >
      {/* =========================================
          QUICK ACTIONS GRID
          ========================================= */}
      <div className="grid grid-cols-3 gap-3">
        {/* WiFi */}
        <button 
          onClick={() => setWifiOn(!wifiOn)}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            wifiOn 
              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
              : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          <LuWifi size={20} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">WiFi</span>
        </button>

        {/* Bluetooth */}
        <button 
          onClick={() => setBtOn(!btOn)}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            btOn 
              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
              : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          <LuBluetooth size={20} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">Bluetooth</span>
        </button>

        {/* Focus / Catnap */}
        <button 
          onClick={() => setDndOn(!dndOn)}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            dndOn 
              ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400" 
              : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          {/* Using fill on the moon when active makes it look like a true OS toggle */}
          <LuMoon size={20} strokeWidth={2.5} className={dndOn ? "fill-white" : ""} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">Catnap</span>
        </button>
      </div>

      {/* =========================================
          SLIDERS (Brightness & Volume)
          ========================================= */}
      <div className="flex flex-col gap-4 bg-black/30 p-4 rounded-xl border border-white/10 shadow-inner">
        
        {/* Brightness */}
        <div className="flex items-center gap-3">
          <LuSun className="text-white/70 shrink-0" size={18} strokeWidth={2.5} />
          <input 
            type="range" min="0" max="100" defaultValue="80"
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white outline-none focus:ring-2 focus:ring-white/30 transition-all" 
          />
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <LuVolume2 className="text-white/70 shrink-0" size={18} strokeWidth={2.5} />
          <input 
            type="range" min="0" max="100" defaultValue="60"
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white outline-none focus:ring-2 focus:ring-white/30 transition-all" 
          />
        </div>
      </div>

      {/* =========================================
          FOOTER (Battery Status)
          ========================================= */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-white/80">
          <LuBatteryMedium className="text-white" size={18} strokeWidth={2} />
          <span className="text-xs font-semibold tracking-wide">64%</span>
        </div>
        
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
          {wifiOn ? "MeowOS Network" : "Disconnected"}
        </span>
      </div>

    </motion.div>
  )
}