"use client"
import { useState, useEffect } from "react"
import { FiWifi, FiBattery } from "react-icons/fi"

export default function SystemTray({ onOpen }) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex items-center gap-3 text-white/80 cursor-pointer hover:text-white transition"
      onClick={onOpen}
    >
      <FiWifi className="text-base" />
      <FiBattery className="text-base" />
      <span className="text-xs font-medium tracking-wide">{time}</span>
    </div>
  )
}