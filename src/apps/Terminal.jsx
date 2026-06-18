"use client"
import { useState, useRef, useEffect } from "react"

const commands = {
  help: "Available commands: help, about, clear, echo, date, meow",
  about: "meowOS v1.0 — a browser-based desktop OS built for HackClub",
  date: () => new Date().toLocaleString(),
  meow: "meow! 🐱",
  echo: (args) => args.join(" ") || "echo what?",
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome to meowOS terminal 🐱 type 'help' to get started" }
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const handleCommand = (e) => {
    if (e.key !== "Enter") return

    const trimmed = input.trim()
    const [cmd, ...args] = trimmed.split(" ")

    let output
    if (trimmed === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (commands[cmd]) {
      output = typeof commands[cmd] === "function"
        ? commands[cmd](args)
        : commands[cmd]
    } else {
      output = `command not found: ${cmd}`
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      { type: "output", text: output },
    ])
    setInput("")
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg p-3 font-mono text-sm">
      <div className="flex-1 overflow-auto space-y-1">
        {history.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-green-400" : "text-gray-300"}>
            {line.type === "input" ? `> ${line.text}` : line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 mt-2 border-t border-gray-700 pt-2">
        <span className="text-green-400">{">"}</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent text-gray-100 outline-none"
          placeholder="type a command..."
        />
      </div>
    </div>
  )
}