"use client"
import { useState, useEffect } from "react"
import { LuWifi, LuBatteryFull } from "react-icons/lu"

export default function SystemTray({ onOpen }) {
  const [time, setTime] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <button
      className="flex items-center gap-2.5 text-white/80 hover:text-white transition-all px-3 py-1.5 rounded-xl hover:bg-white/10 outline-none"
      onClick={onOpen}
    >
      <LuWifi className="text-[16px]" strokeWidth={2.5} />
      <LuBatteryFull className="text-[17px] opacity-90" strokeWidth={2} />
      <span className="text-xs font-semibold tracking-wider tabular-nums ml-0.5">
        {mounted ? time : "--:--"}
      </span>
    </button>
  )
}