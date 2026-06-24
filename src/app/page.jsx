"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Desktop from "@/components/desktop/Desktop"

export default function Home() {
  const router = useRouter()
  const [booted, setBooted] = useState(false)
  const [visible, setVisible] = useState(false)

useEffect(() => {
  const hasBooted = sessionStorage.getItem("meowos-booted")
  if (!hasBooted) {
    router.push("/shutdown")
  } else {
    setBooted(true)
    setTimeout(() => setVisible(true), 50)
    const audio = new Audio("/boot.mp3")
    audio.volume = 0.3
    audio.play().catch(() => {})
  }
}, [])

  if (!booted) return <div className="w-screen h-screen bg-black" />

  return <Desktop />
}