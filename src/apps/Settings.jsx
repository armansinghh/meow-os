"use client"
import useWindowStore from "@/store/useWindowStore"

const wallpapers = [
  {
    id: "cats1",
    label: "Cozy Cat",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=80",
  },
  {
    id: "cats2",
    label: "Mogger Cat",
    url: "https://cdn.pixabay.com/photo/2018/05/09/21/47/cat-3386220_1280.jpg",
  },
  {
    id: "cats3",
    label: "Kitten",
    url: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=1092",
  },
  {
    id: "cats4",
    label: "Sleepy Cats",
    url: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=1087",
  },
]

export default function Settings() {
  const { wallpaper, setWallpaper } = useWindowStore()

  return (
    <div className="flex flex-col gap-4 p-2">
      <h2 className="text-sm font-semibold text-gray-700">Wallpaper</h2>
      <div className="grid grid-cols-2 gap-3">
        {wallpapers.map((wp) => (
          <button
            key={wp.id}
            onClick={() => setWallpaper(wp.url)}
            className={`relative h-24 rounded-xl overflow-hidden border-2 transition ${
              wallpaper === wp.url ? "border-purple-500 scale-105" : "border-transparent"
            }`}
          >
            <img
              src={wp.url}
              alt={wp.label}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-0 right-0 text-center text-xs text-white font-medium drop-shadow">
              {wp.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}