"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { IoPaw } from "react-icons/io5"

export default function PawWatch() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return (
    <div className="flex h-full items-center justify-center bg-[#fcfbf9]">
      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours()

  const secDegrees = seconds * 6
  const minDegrees = minutes * 6 + seconds * 0.1
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5

  const isAm = hours < 12
  const hours12 = hours % 12 || 12
  const formattedMins = minutes.toString().padStart(2, "0")

  return (
    <div className="relative flex items-center justify-center h-full bg-slate-50 overflow-hidden font-sans p-8 rounded-lg">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative flex flex-col md:flex-row items-center gap-10 md:gap-14 z-10"
      >
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white shadow-[inset_0_-4px_6px_rgba(0,0,0,0.05),0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center shrink-0">
          
          {/* Smooth Cat Ears (Tucked behind the clock) */}
          <div className="absolute -top-3 left-3 w-14 h-14 bg-white rounded-tl-4xl rounded-br-xl rounded-tr-md border-t border-l border-slate-100 shadow-sm rotate-20 -z-10" />
          <div className="absolute -top-3 right-3 w-14 h-14 bg-white rounded-tr-4xl rounded-bl-xl rounded-tl-md border-t border-r border-slate-100 shadow-sm rotate-[-20deg] -z-10" />

          {/* Clock Dial Markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className={`mx-auto mt-2 ${i % 3 === 0 ? 'w-1.5 h-4 bg-slate-400 rounded-full' : 'w-1 h-2 bg-slate-200 rounded-full'}`} />
            </div>
          ))}

          {/* Hour Hand */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-1.5 h-14 sm:h-16 bg-slate-800 rounded-full origin-bottom -translate-x-1/2 z-20"
            style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
          />

          {/* Minute Hand */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-1 h-20 sm:h-24 bg-slate-500 rounded-full origin-bottom -translate-x-1/2 z-20"
            style={{ transform: `translateX(-50%) rotate(${minDegrees}deg)` }}
          />

          {/* Second Hand */}
          <div 
            className="absolute bottom-1/2 left-1/2 w-0.5 h-22 sm:h-26 bg-purple-500 rounded-full origin-bottom -translate-x-1/2 z-30 transition-transform duration-400 ease-[cubic-bezier(0.4,2.08,0.55,0.44)]"
            style={{ transform: `translateX(-50%) rotate(${secDegrees}deg)` }}
          >
            {/* The Paw Print */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-purple-500 bg-white rounded-full p-0.5">
              <IoPaw size={12} />
            </div>
          </div>

          {/* Center Pin */}
          <div className="absolute w-3 h-3 bg-pink-400 rounded-full z-40 border-2 border-white shadow-sm" />
        </div>

        {/* =========================================
            THE DIGITAL READOUT (Moved to Right)
            ========================================= */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
          <div className="flex items-baseline gap-2 text-slate-800">
            <span className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums">
              {hours12}:{formattedMins}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-400 uppercase tracking-wide">
              {isAm ? "am" : "pm"}
            </span>
          </div>
          
          <div className="flex flex-col mt-3">
            <span className="text-lg sm:text-xl font-semibold text-slate-600 tracking-wide">
              {time.toLocaleDateString(undefined, { weekday: "long" })}
            </span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">
              {time.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  )
}