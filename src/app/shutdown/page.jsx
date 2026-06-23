"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FiMoon } from "react-icons/fi"
import { FaPaw } from "react-icons/fa"
import { motion } from "framer-motion"

export default function ShutdownScreen() {
  const router = useRouter()
  const [isWaking, setIsWaking] = useState(false)

  const handleWake = () => {
    setIsWaking(true)
    setTimeout(() => {
      router.push("/boot")
    }, 800)
  }

  return (
    <div className="w-screen h-screen bg-[#070709] flex flex-col items-center justify-center overflow-hidden relative selection:bg-transparent">

      {/* BACKGROUND WATERMARK: Static Muted Fade */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.03 }} // <-- Hardlocks it to 3% right out of the gate
        animate={{ opacity: isWaking ? 0 : 0.03 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <FaPaw className="w-[40vw] h-[40vw] min-w-75 text-white" />
      </motion.div>

      {/* FOREGROUND: Physics-based "Wake" Pill */}
      <motion.button
        onClick={handleWake}
        disabled={isWaking}

        // The Physics Settings
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{
          opacity: isWaking ? 0 : 1,
          scale: isWaking ? 0.95 : 1
        }}
        whileHover={!isWaking ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" } : {}}
        whileTap={!isWaking ? { scale: 0.96 } : {}}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}

        className="group relative flex items-center gap-4 p-2 pr-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl z-10 shadow-lg"
      >
        {/* Moon Icon Container */}
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/5 shadow-inner"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <FiMoon className="text-white/60 group-hover:text-white transition-colors duration-300" size={20} />
        </motion.div>

        {/* Text Area */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-white/90 font-medium text-sm tracking-wide">
            meowOS is napping
          </span>
          <span className="text-white/40 text-[11px] tracking-wider group-hover:text-white/70 transition-colors duration-300">
            Click to paw-er on...
          </span>
        </div>
      </motion.button>

    </div>
  )
}