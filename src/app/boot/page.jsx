"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
  "",
  "Welcome to meowOS. 🐾",
]

export default function BootScreen() {
  const router = useRouter()
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 700)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!started) return

    if (lineIndex >= bootLines.length) {
      setDone(true)
      setTimeout(() => {
        sessionStorage.setItem("meowos-booted", "true")
        router.push("/")
      }, 800)
      return
    }

    const line = bootLines[lineIndex]

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 8)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex((prev) => prev + 1)
      }, 40)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex, started])

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center p-8 font-mono text-sm">
      <div className="flex flex-col gap-0.5 w-fit">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith("[  OK") ? "text-green-400" : "text-gray-300"}>
            {line}
          </div>
        ))}
        <div className="text-gray-300 flex items-center gap-0.5">
          {currentLine}
          {!done && <span className="animate-pulse">█</span>}
        </div>
      </div>
    </div>
  )
}