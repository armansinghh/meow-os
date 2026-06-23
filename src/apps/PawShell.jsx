"use client"
import { useState, useRef, useEffect } from "react"

const bootMessage = `
   /\\_/\\
  ( o.o )  Welcome to meowOS PawShell
   > ^ <   Type 'help' to get started
`

const commands = {
  help: "Available commands: help, about, clear, echo, date, meow, fetch, sudo",
  about: "meowOS v1.0 — The purr-fect browser OS built for HackClub.",
  date: () => new Date().toLocaleString(),
  meow: "meow! 🐱🐾",
  fetch: "Fetching... 🎾 wait, I'm a cat. I don't fetch.",
  sudo: "user is not in the sudoers file. This incident will be reported to the top cat.",
  echo: (args) => args.length > 0 ? args.join(" ") : "echo what?",
}

export default function PawShell() {
  const [history, setHistory] = useState([
    { type: "output", text: bootMessage }
  ])
  const [input, setInput] = useState("")
  
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" })
  }, [history])

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Enter") {
      executeCommand()
    }
  }

  const executeCommand = () => {
    if (!input.trim()) return

    const trimmed = input.trim()
    const [cmd, ...args] = trimmed.split(" ")

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

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
      output = `meowOS: command not found: ${cmd}`
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      { type: "output", text: output },
    ])
    setInput("")
  }

  return (
    <div 
      className="flex flex-col h-full bg-[#1e1e2e] text-[#cdd6f4] p-4 font-mono text-sm cursor-text overflow-hidden rounded-lg"
      onClick={handleTerminalClick}
    >
      {/* Title Bar Simulation (Optional, blends with window) */}
      <div className="text-center text-[#6c7086] text-xs mb-4 pb-2 border-b border-[#313244] uppercase tracking-widest select-none">
        bash — 80x24
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto space-y-1 pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap wrap-break-word">
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-[#a6e3a1] font-bold">guest@meowOS</span>
                <span className="text-[#89b4fa] font-bold">~ $</span>
                <span className="text-white">{line.text}</span>
              </div>
            ) : (
              <div className="text-[#bac2de]">{line.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-start gap-2 mt-1 shrink-0">
        <span className="text-[#a6e3a1] font-bold">guest@meowOS</span>
        <span className="text-[#89b4fa] font-bold">~ $</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none caret-[#f38ba8]"
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  )
}