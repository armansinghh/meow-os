"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoPaw } from "react-icons/io5"
import { FiCheck, FiEdit3 } from "react-icons/fi"

const APP_VERSION = "2.0.0"
const MAX_CHARS = 2000

export default function MeowPad() {
  const [text, setText] = useState("")
  const [status, setStatus] = useState("saved")
  const isFirstRender = useRef(true)

  useEffect(() => {
    const rawData = localStorage.getItem("meowos-texteditor")
    if (rawData) {
      try {
        const parsed = rawData.startsWith("{") ? JSON.parse(rawData).content : rawData
        setText(parsed ? parsed.slice(0, MAX_CHARS) : "")
      } catch (e) {
        console.error("Meow OS: Failed to load notes", e)
      }
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setStatus("typing")

    const saveTimeout = setTimeout(() => {
      setStatus("saving")

      const payload = {
        version: APP_VERSION,
        content: text,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem("meowos-texteditor", JSON.stringify(payload))

      setTimeout(() => setStatus("saved"), 500)
    }, 800)

    return () => clearTimeout(saveTimeout)
  }, [text])

  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue.length <= MAX_CHARS) {
      setText(newValue)
    }
  }

  const wordCount = text.trim().split(/\s+/).filter((w) => w.length > 0).length
  const charCount = text.length
  const isAtLimit = charCount >= MAX_CHARS

  return (
    <div className="relative flex flex-col h-full bg-[#fcfbf9] text-slate-800 selection:bg-purple-200 overflow-hidden">

      {/* Meow OS Watermark */}
      <IoPaw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-slate-200/40 pointer-events-none z-0" />

      {/* Distraction-Free Canvas */}
      <div className="flex-1 w-full h-full overflow-y-auto px-8 py-10 hide-scroll z-10 relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start scratching down your thoughts..."
          className="w-full h-full max-w-2xl mx-auto block resize-none bg-transparent text-base text-slate-700 placeholder-slate-400 focus:outline-none leading-relaxed"
          spellCheck="false"
        />
      </div>

      {/* Floating Glassmorphic Status Pill */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}

        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max whitespace-nowrap flex items-center gap-3 px-5 py-2.5 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-full text-xs font-medium text-slate-500 z-50"
      >
        {/* Status Indicator */}
        <div className="flex items-center gap-2 min-w-20">
          <AnimatePresence mode="wait">
            {status === "typing" && (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-slate-400">
                <FiEdit3 className="text-sm shrink-0" /> Typing...
              </motion.div>
            )}
            {status === "saving" && (
              <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-purple-500">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="shrink-0">
                  <IoPaw className="text-sm" />
                </motion.div>
                Saving
              </motion.div>
            )}
            {status === "saved" && (
              <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-emerald-500">
                <FiCheck className="text-sm shrink-0" /> Saved
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-3 bg-slate-200 shrink-0" />

        {/* Stats & Limit */}
        <div className="flex items-center gap-3 tabular-nums shrink-0">
          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          <span className={`transition-colors duration-300 ${isAtLimit ? 'text-red-500 font-bold' : ''}`}>
            {charCount} / {MAX_CHARS} chars
          </span>
        </div>

        <div className="w-px h-3 bg-slate-200 shrink-0" />

        {/* Version Indicator */}
        <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] shrink-0">
          v{APP_VERSION}
        </span>
      </motion.div>

    </div>
  )
}