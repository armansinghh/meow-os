"use client"
import { useState, useEffect } from "react"
import { Rnd } from "react-rnd"

export default function DraggableWidget({ id, defaultX, defaultY, children }) {
  const [isMounted, setIsMounted] = useState(false)
  const [position, setPosition] = useState({ x: defaultX, y: defaultY })
  const storageKey = `meowos-widget-${id}`

  useEffect(() => {
    setIsMounted(true)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setPosition(JSON.parse(saved))
    } catch {}
  }, [storageKey])

  if (!isMounted) return null

  return (
    <Rnd
      className="z-10 absolute"
      default={{ x: position.x, y: position.y, width: "auto", height: "auto" }}
      enableResizing={false}
      bounds="parent"
      onDragStop={(e, d) => {
        localStorage.setItem(storageKey, JSON.stringify({ x: d.x, y: d.y }))
      }}
    >
      <div className="pointer-events-auto cursor-grab active:cursor-grabbing select-none">
        {children}
      </div>
    </Rnd>
  )
}