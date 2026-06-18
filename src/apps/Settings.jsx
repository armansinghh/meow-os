"use client"
import useWindowStore from "@/store/useWindowStore"

const wallpapers = [
  { id: "default", label: "Sunset", class: "from-pink-300 via-purple-300 to-blue-300" },
  { id: "ocean", label: "Ocean", class: "from-blue-400 via-cyan-300 to-teal-300" },
  { id: "forest", label: "Forest", class: "from-green-400 via-emerald-300 to-teal-400" },
  { id: "midnight", label: "Midnight", class: "from-gray-900 via-purple-900 to-gray-800" },
  { id: "candy", label: "Candy", class: "from-pink-400 via-red-300 to-yellow-300" },
]

export default function Settings() {
  const { wallpaper, setWallpaper } = useWindowStore()

  return (
    <div className="flex flex-col gap-4 p-2">
      <h2 className="text-sm font-semibold text-gray-700">Wallpaper</h2>
      <div className="grid grid-cols-3 gap-3">
        {wallpapers.map((wp) => (
          <button
            key={wp.id}
            onClick={() => setWallpaper(wp.class)}
            className={`h-16 rounded-xl bg-linear-to-br ${wp.class} border-2 transition ${
              wallpaper === wp.class ? "border-purple-500 scale-105" : "border-transparent"
            }`}
          >
            <span className="text-xs text-white font-medium drop-shadow">{wp.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}