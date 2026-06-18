"use client"
import { useState } from "react"

export default function TextEditor() {
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem("meowos-texteditor", text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLoad = () => {
    const saved = localStorage.getItem("meowos-texteditor")
    if (saved) setText(saved)
  }

  return (
    <div className="flex flex-col h-full gap-2">
      
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
        <button
          onClick={handleLoad}
          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
        >
          Load
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

    </div>
  )
}