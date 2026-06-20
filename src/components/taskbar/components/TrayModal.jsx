"use client"
import { FiWifi, FiBattery, FiX } from "react-icons/fi"

export default function TrayModal({ onClose }) {
  return (
    <div className="absolute bottom-14 right-4 w-64 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col gap-4 text-white shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Quick Settings</span>
        <button onClick={onClose} className="text-white/50 hover:text-white transition">
          <FiX />
        </button>
      </div>

      {/* Wifi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <FiWifi />
          <span>WiFi</span>
        </div>
        <span className="text-xs text-white/50">Connected</span>
      </div>

      {/* Battery */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <FiBattery />
          <span>Battery</span>
        </div>
        <span className="text-xs text-white/50">100%</span>
      </div>

      {/* Brightness */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-white/60">Brightness</span>
        <input type="range" min="0" max="100" defaultValue="80"
          className="w-full accent-white" />
      </div>

      {/* Volume */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-white/60">Volume</span>
        <input type="range" min="0" max="100" defaultValue="60"
          className="w-full accent-white" />
      </div>

    </div>
  )
}