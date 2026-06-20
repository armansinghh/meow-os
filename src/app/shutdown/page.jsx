"use client"
import { useRouter } from "next/navigation"
import { FaPowerOff } from "react-icons/fa6"

export default function ShutdownScreen() {
  const router = useRouter()

  const handlePowerOn = () => {
    router.push("/boot")
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-6">
      <p className="text-white/30 font-mono text-sm tracking-widest uppercase">
        meowOS has shut down
      </p>
      <button
        onClick={handlePowerOn}
        className="w-16 h-16 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
      >
        <FaPowerOff className="text-white/30 group-hover:text-white/80 text-xl transition-all duration-300" />
      </button>
      <p className="text-white/20 font-mono text-xs">
        press to start
      </p>
    </div>
  )
}