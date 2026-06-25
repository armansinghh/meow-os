"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { FiImage, FiInfo, FiMonitor, FiCheck, FiLink } from "react-icons/fi"
import { IoPaw } from "react-icons/io5"
import useWindowStore from "@/store/useWindowStore"

const wallpapers = [
  {
    id: "cats1",
    label: "Sleepy Cats",
    url: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=1087",
  },
  {
    id: "cats2",
    label: "Mogger Cat",
    url: "https://cdn.pixabay.com/photo/2018/05/09/21/47/cat-3386220_1280.jpg",
  },
  {
    id: "cats4",
    label: "Cozy Cat",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=80",
  },
]

export default function PawNel() {
  const { wallpaper, setWallpaper } = useWindowStore()
  const [activeTab, setActiveTab] = useState("appearance")
  
  const [customUrl, setCustomUrl] = useState("")
  const [isTestingUrl, setIsTestingUrl] = useState(false)
  const [urlError, setUrlError] = useState("")

  const activeWallpaper = wallpaper || wallpapers[0].url

  const tabs = [
    { id: "appearance", label: "Paw-sonalization", icon: FiImage },
    { id: "about", label: "About Meow OS", icon: FiInfo },
  ]

  const handleCustomWallpaperSubmit = (e) => {
    e.preventDefault()
    if (!customUrl.trim()) return

    setIsTestingUrl(true)
    setUrlError("")

    const img = new Image()
    img.src = customUrl

    img.onload = () => {
      setWallpaper(customUrl)
      setCustomUrl("")
      setIsTestingUrl(false)
    }

    img.onerror = () => {
      setUrlError("Invalid image link. Please make sure it ends in .png, .jpg, etc.")
      setIsTestingUrl(false)
    }
  }

  return (
    <div className="flex h-full bg-[#fcfbf9] text-slate-800 font-sans overflow-hidden selection:bg-purple-200">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-48 bg-slate-100/50 border-r border-slate-200 p-3 flex flex-col gap-1 shrink-0">
        <div className="px-3 py-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          System
        </div>
        
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-purple-100/50 text-purple-700 shadow-sm border border-purple-200/50" 
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Icon className={isActive ? "text-purple-500" : "text-slate-400"} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative">
        
        {/* TAB 1: APPEARANCE */}
        {activeTab === "appearance" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col max-w-2xl mx-auto">
            
            {/* Desktop Preview Hero */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FiMonitor className="text-slate-400" /> Current Desktop
              </h2>
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 relative bg-slate-900 group">
                <img 
                  src={activeWallpaper} 
                  alt="Current Wallpaper" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Mock UI Overlay to look like a desktop */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-slate-900/60 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/20" />
                  <div className="w-6 h-6 rounded-md bg-white/20" />
                  <div className="w-6 h-6 rounded-md bg-white/20" />
                </div>
              </div>
            </div>

            {/* Default Wallpaper Grid */}
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
              Choose a background
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {wallpapers.map((wp) => {
                const isActive = activeWallpaper === wp.url
                
                return (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.url)}
                    className="relative group rounded-xl overflow-hidden aspect-video outline-none shadow-sm border border-slate-200"
                  >
                    <img
                      src={wp.url}
                      alt={wp.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-linear-to-t from-black/70 to-transparent">
                      <span className="text-xs text-white font-medium drop-shadow-md">
                        {wp.label}
                      </span>
                    </div>
                    
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-purple-500 text-white p-1 rounded-full shadow-md z-20"
                      >
                        <FiCheck className="text-xs" />
                      </motion.div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Custom URL Input Section */}
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
              Or Use Custom Image Link
            </h3>
            <form onSubmit={handleCustomWallpaperSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    placeholder="https://example.com/my-cat.png"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value)
                      if (urlError) setUrlError("")
                    }}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTestingUrl || !customUrl.trim()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-25 flex justify-center"
                >
                  {isTestingUrl ? (
                    <span className="animate-pulse">Checking...</span>
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
              {urlError && (
                <span className="text-xs text-red-500 font-medium ml-1">
                  {urlError}
                </span>
              )}
            </form>

          </motion.div>
        )}

        {/* TAB 2: ABOUT MEOW OS */}
        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full max-w-sm mx-auto text-center mt-10">
            <div className="w-24 h-24 bg-white shadow-xl shadow-purple-500/10 rounded-3xl border border-slate-100 flex items-center justify-center mb-6">
              <IoPaw className="text-6xl text-purple-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Meow OS</h2>
            <p className="text-purple-500 font-medium uppercase tracking-widest text-xs mt-1 mb-6">Version 1.0.0</p>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              A custom, browser-based operating system built for purr-formance. Featuring native-feeling window management, smooth animations, and a distinct feline aesthetic.
            </p>

            <div className="w-full bg-slate-100 rounded-xl p-4 text-left border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-2 border-b border-slate-200 pb-2">
                <span>Kernel</span>
                <span className="font-mono text-slate-700">Next.js 16.2.9</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-2 border-b border-slate-200 pb-2">
                <span>Graphics</span>
                <span className="font-mono text-slate-700">Framer Motion</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>State</span>
                <span className="font-mono text-slate-700">Zustand</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}