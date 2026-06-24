"use client"
import { useState, useEffect } from "react"
import { IoPaw } from "react-icons/io5"

export default function ClockWidget() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return (
    <div className="w-64 h-26 bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl" />
  )

  const hours = time.getHours()
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const greeting = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening"
  const displayHours = (hours % 12 || 12).toString() 

  return (
    <div className="w-64 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white select-none shadow-lg flex flex-col justify-between">
      
      {/* Top Section: Time & Icon */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-0.5">
            {greeting}
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-4xl font-light tracking-tighter text-white/90">
              {displayHours}
            </span>
            <span className="text-2xl font-light text-white/40">
              :
            </span>
            <span className="text-4xl font-light tracking-tighter text-white/90">
              {minutes}
            </span>
          </div>
        </div>
        
        {/* Static Paw Icon */}
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 mt-1">
            <IoPaw className="text-white/30" size={14} />
        </div>
      </div>

      {/* Bottom Section: Date & Status Indicator */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
        <span className="text-[11px] text-white/60 tracking-wider font-medium">
          {time.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
        </span>
      </div>
      
    </div>
  )
}