"use client"
import { useState, useEffect } from "react"
import { IoPaw } from "react-icons/io5"

export default function StickyNoteWidget() {
  const [note, setNote] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  // Safe hydration: Wait for mount before reading local storage
  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("meowos-sticky")
    if (saved) setNote(saved)
  }, [])

  const handleChange = (e) => {
    setNote(e.target.value)
    localStorage.setItem("meowos-sticky", e.target.value)
  }

  // Skeleton loader to match the layout before hydration
  if (!isMounted) return (
    <div className="w-64 h-42 bg-yellow-900/10 backdrop-blur-md border border-yellow-500/10 rounded-2xl" />
  )

  return (
    <div className="w-64 bg-yellow-900/20 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-4 flex flex-col gap-3 shadow-lg select-none">
      
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-yellow-500/20 pb-2">
        <div className="text-xs font-bold text-yellow-500/60 uppercase tracking-widest">
          Quick Note
        </div>
        <IoPaw className="text-yellow-500/40 text-sm" />
      </div>

      {/* Note Input Area */}
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Jot down a meow..."
        className="w-full h-24 bg-transparent resize-none text-sm text-yellow-100/90 placeholder-yellow-500/40 focus:outline-none leading-relaxed selection:bg-yellow-500/30"
        spellCheck={false}
      />
      
    </div>
  )
}