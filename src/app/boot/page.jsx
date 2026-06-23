"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaPaw } from "react-icons/fa6"

const bootLines = [
  "[    0.000000] Booting meowOS kernel v1.0.0-meow...",
  "[    0.000001] Initializing paw modules...",
  "[    0.000023] Detecting cat hardware...",
  "[    0.000056] Loading /lib/modules/whiskers.ko",
  "[    0.000089] Mounting /home/cat...",
  "[    0.000112] Starting purr daemon...",
  "[    0.000145] Checking fish reserves... OK",
  "[    0.000201] Initializing nap scheduler...",
  "[    0.000267] Loading meow sound drivers...",
  "[    0.000312] Starting window manager...",
  "[  OK  ] Started meowOS Session Manager.",
  "[  OK  ] Reached target Cat Desktop.",
]

export default function BootScreen() {
  const router = useRouter()
  const [lines, setLines] = useState([])
  const [lineIndex, setLineIndex] = useState(0)
  const [phase, setPhase] = useState("booting")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 700)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!started || phase !== "booting") return

    if (lineIndex >= bootLines.length) {
      setTimeout(() => setPhase("logo"), 400)
      return
    }

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, bootLines[lineIndex]])
      setLineIndex((prev) => prev + 1)
    }, 120)

    return () => clearTimeout(timeout)
  }, [lineIndex, started, phase])

  useEffect(() => {
    if (phase === "logo") {
      const timer = setTimeout(() => setPhase("exiting"), 1800)
      return () => clearTimeout(timer)
    }
    if (phase === "exiting") {
      sessionStorage.setItem("meowos-booted", "true")
      router.push("/")
    }
  }, [phase, router])

  return (
    <div className={`w-screen h-screen bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${phase === "exiting" ? "opacity-0" : "opacity-100"}`}>

      {/* PHASE 1: Boot text */}
      {phase === "booting" && (
        <div className="w-fit flex flex-col gap-0.5 font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className={line.startsWith("[  OK") ? "text-green-400" : "text-gray-300"}>
              {line}
            </div>
          ))}
          {lineIndex < bootLines.length && (
            <span className="animate-pulse text-gray-300">█</span>
          )}
        </div>
      )}

      {/* PHASE 2: Logo splash */}
      {phase === "logo" && (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
          <FaPaw className="text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" style={{ fontSize: "8rem" }} />
          <p className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase">
            meowOS
          </p>
        </div>
      )}

    </div>
  )
}