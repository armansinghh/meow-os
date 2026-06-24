"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { LuWifi, LuBatteryFull, LuBluetooth, LuMoon, LuSun, LuVolume2 } from "react-icons/lu"

let systemState = {
  wifiOn: true,
  btOn: false,
  dndOn: false,
  brightness: 100,
  volume: 60
}

export default function TrayModal({ onClose }) {
  const modalRef = useRef(null)
  
  const [wifiOn, setWifiOn] = useState(systemState.wifiOn)
  const [btOn, setBtOn] = useState(systemState.btOn)
  const [dndOn, setDndOn] = useState(systemState.dndOn)
  const [brightness, setBrightness] = useState(systemState.brightness)
  const [volume, setVolume] = useState(systemState.volume)
  const toggleWifi = () => { systemState.wifiOn = !wifiOn; setWifiOn(!wifiOn) }
  const toggleBt = () => { systemState.btOn = !btOn; setBtOn(!btOn) }
  const toggleDnd = () => { systemState.dndOn = !dndOn; setDndOn(!dndOn) }
  
  const handleBrightness = (e) => {
    const val = Number(e.target.value)
    systemState.brightness = val
    setBrightness(val)
  }

  const handleVolume = (e) => {
    const val = Number(e.target.value)
    systemState.volume = val
    setVolume(val)
  }

  useEffect(() => {
    let overlay = document.getElementById("meowos-brightness-layer")
    
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.id = "meowos-brightness-layer"
      overlay.style.position = "fixed"
      overlay.style.inset = "0"
      overlay.style.pointerEvents = "none"
      overlay.style.zIndex = "999999"
      overlay.style.mixBlendMode = "multiply"
      document.body.appendChild(overlay)
    }

    const opacity = (100 - brightness) * 0.006 
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
  }, [brightness])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const brightnessPercent = ((brightness - 15) / 85) * 100
  const volumePercent = volume
  const sliderThumbStyle = "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_5px_rgba(0,0,0,0.5)]"

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute bottom-16 right-4 w-72 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-110 select-none"
    >
      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={toggleWifi}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            wifiOn ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          <LuWifi size={20} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">WiFi</span>
        </button>

        <button 
          onClick={toggleBt}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            btOn ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          <LuBluetooth size={20} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">Bluetooth</span>
        </button>

        <button 
          onClick={toggleDnd}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 outline-none ${
            dndOn ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400" : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/5"
          }`}
        >
          <LuMoon size={20} strokeWidth={2.5} className={dndOn ? "fill-white" : ""} />
          <span className="text-[10px] font-bold tracking-wide mt-0.5">Catnap</span>
        </button>
      </div>

      {/* SLIDERS (Brightness & Volume) */}
      <div className="flex flex-col gap-4 bg-black/30 p-4 rounded-xl border border-white/10 shadow-inner">
        
        {/* Brightness Slider */}
        <div className="flex items-center gap-3">
          <LuSun className="text-white/70 shrink-0" size={18} strokeWidth={2.5} />
          <input 
            type="range" 
            min="15" 
            max="100" 
            value={brightness}
            onChange={handleBrightness}
            style={{ background: `linear-gradient(to right, #ffffff ${brightnessPercent}%, rgba(255,255,255,0.2) ${brightnessPercent}%)` }}
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none transition-all ${sliderThumbStyle}`} 
          />
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-3">
          <LuVolume2 className="text-white/70 shrink-0" size={18} strokeWidth={2.5} />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolume}
            style={{ background: `linear-gradient(to right, #ffffff ${volumePercent}%, rgba(255,255,255,0.2) ${volumePercent}%)` }}
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none transition-all ${sliderThumbStyle}`} 
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-white/80">
          <LuBatteryFull className="text-white" size={18} strokeWidth={2} />
          <span className="text-xs font-semibold tracking-wide">97%</span>
        </div>
        
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
          {wifiOn ? "MeowOS Network" : "Disconnected"}
        </span>
      </div>
    </motion.div>
  )
}