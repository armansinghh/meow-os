"use client"
import useWindowStore from "@/store/useWindowStore"
import apps from "@/apps"

export default function Taskbar() {
  const { openWindow, windows, minimizeWindow } = useWindowStore()

  const handleAppClick = (app) => {
    const isOpen = windows.find((w) => w.id === app.id)
    if (isOpen) {
      minimizeWindow(app.id)
    } else {
      openWindow(app)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/20 backdrop-blur-md border-t border-white/30 flex items-center justify-center gap-3 px-4">
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => handleAppClick(app)}
          className="w-10 h-10 rounded-xl bg-white/30 hover:bg-white/50 transition flex items-center justify-center text-xl"
          title={app.title}
        >
          {app.icon}
        </button>
      ))}
    </div>
  )
}