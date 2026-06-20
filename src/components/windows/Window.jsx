"use client"
import { Rnd } from "react-rnd"
import { motion } from "framer-motion"
import useWindowStore from "@/store/useWindowStore"

export default function Window({ id, title, children, x, y, width, height, zIndex }) {
  const { closeWindow, focusWindow, minimizeWindow } = useWindowStore()

  return (
    <Rnd
      default={{ x, y, width, height }}
      minWidth={300}
      minHeight={200}
      style={{ zIndex }}
      onMouseDown={() => focusWindow(id)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/40"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-white/80 backdrop-blur border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          <div className="flex gap-2">
            <button onClick={() => minimizeWindow(id)} className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500" />
            <button onClick={() => closeWindow(id)} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500" />
          </div>
        </div>

        {/* App content */}
        <div className="flex-1 overflow-auto p-3">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}