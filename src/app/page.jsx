"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Desktop from "@/components/desktop/Desktop"

export default function Home() {
  const router = useRouter()
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("meowos-booted")
    if (!hasBooted) {
      router.push("/boot")
    } else {
      setBooted(true)
    }
  }, [])

  if (!booted) return <div className="w-screen h-screen bg-black" />

  return <Desktop />
}