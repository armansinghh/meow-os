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
  const [matrixMode, setMatrixMode] = useState(false)
  
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

  const executeCommand = async () => {
    if (!input.trim()) return

    const trimmed = input.trim()
    const [cmd, ...args] = trimmed.split(" ")

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    setHistory((prev) => [...prev, { type: "input", text: trimmed }])
    setInput("")

    let output

    if (trimmed === "clear") {
      setHistory([])
      return
    } 
    else if (trimmed === "sudo rm -rf /") {
      output = "Nice try, human. Cats have 9 lives. 🐈"
    } 
    else if (trimmed === "matrix") {
      setMatrixMode((prev) => !prev)
      output = matrixMode 
        ? "Exiting the meow-trix... 🐾" 
        : "Wake up, Neo... The litter box is calling. 🐈‍⬛"
    } 
    else if (trimmed === "pspsps") {
      try {
        const res = await fetch("https://catfact.ninja/fact")
        if (!res.ok) throw new Error()
        const data = await res.json()
        output = `*purr* Did you know? ${data.fact}`
      } catch {
        output = "*runs away and hides under the sofa*"
      }
    } 
    // --- STANDARD COMMANDS ---
    else if (commands[cmd]) {
      output = typeof commands[cmd] === "function"
        ? commands[cmd](args)
        : commands[cmd]
    } else {
      output = `meowOS: command not found: ${cmd}`
    }

    setHistory((prev) => [...prev, { type: "output", text: output }])
  }

  const textColor = matrixMode ? "text-emerald-400" : "text-[#cdd6f4]"
  const promptColor = matrixMode ? "text-emerald-500" : "text-[#a6e3a1]"
  const symbolColor = matrixMode ? "text-emerald-600" : "text-[#89b4fa]"
  const caretColor = matrixMode ? "caret-emerald-400" : "caret-[#f38ba8]"

  return (
    <div 
      className={`flex flex-col h-full bg-[#1e1e2e] p-4 font-mono text-sm cursor-text overflow-hidden rounded-lg transition-colors duration-500 ${textColor}`}
      onClick={handleTerminalClick}
    >
      {/* Title Bar Simulation */}
      <div className={`text-center text-xs mb-4 pb-2 border-b uppercase tracking-widest select-none transition-colors duration-500 ${matrixMode ? "border-emerald-900 text-emerald-700" : "border-[#313244] text-[#6c7086]"}`}>
        bash — 80x24
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto space-y-1 pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap wrap-break-word">
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className={`${promptColor} font-bold`}>guest@meowOS</span>
                <span className={`${symbolColor} font-bold`}>~ $</span>
                <span>{line.text}</span>
              </div>
            ) : (
              <div className={matrixMode ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "text-[#bac2de]"}>
                {line.text}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-start gap-2 mt-1 shrink-0">
        <span className={`${promptColor} font-bold`}>guest@meowOS</span>
        <span className={`${symbolColor} font-bold`}>~ $</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-transparent outline-none ${textColor} ${caretColor}`}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  )
}