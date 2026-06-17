"use client"
import useWindowStore from "@/store/useWindowStore"

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)

  return (
    <div className="w-screen h-screen bg-linear-to-br from-pink-300 via-purple-300 to-blue-300 relative overflow-hidden">
      
    </div>
  )
}