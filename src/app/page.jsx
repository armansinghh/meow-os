"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Desktop from "@/components/desktop/Desktop"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const booted = sessionStorage.getItem("meowos-booted")
    if (!booted) {
      router.push("/boot")
    }
  }, [])

  return <Desktop />
}