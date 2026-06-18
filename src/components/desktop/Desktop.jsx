"use client"
import useWindowStore from "@/store/useWindowStore"
import Window from "@/components/windows/Window"
import Taskbar from "@/components/taskbar/Taskbar"

export default function Desktop() {
  const windows = useWindowStore((state) => state.windows)

  return (
    <div className="w-screen h-screen bg-linear-to-br from-pink-300 via-purple-300 to-blue-300 relative overflow-hidden">
      {windows
        .filter((w) => !w.minimized)
        .map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            zIndex={w.zIndex}
          >
            <w.component />
          </Window>
        ))}
      <Taskbar />
    </div>
  )
}