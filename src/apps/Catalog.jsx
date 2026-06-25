"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FiFolder, FiChevronLeft, FiSearch, 
  FiHardDrive, FiHome, FiImage, FiFileText 
} from "react-icons/fi"
import useWindowStore from "@/store/useWindowStore"
import TextViewer from "@/components/viewers/TextViewer"
import ImageViewer from "@/components/viewers/ImageViewer"

const files = [
  { id: "documents", name: "Documents", type: "folder", parentId: "home", icon: FiFolder },
  { id: "pictures", name: "Pictures", type: "folder", parentId: "home", icon: FiFolder },
  { id: "design-pdf", name: "meowOS_Design.txt", type: "file", parentId: "documents", icon: FiFileText, content: "meowOS Architecture v1.0\n\n- Kernel: Next.js\n- Engine: Pure Feline Energy\n- Status: 100% Certified Premium Web OS." },
  { id: "cat-photo", name: "Buddy.png", type: "file", parentId: "pictures", icon: FiImage, content: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80" },
  { id: "notes-txt", name: "Notes.txt", type: "file", parentId: "documents", icon: FiFileText, content: "Buy list:\n1. Premium Salmon Treats\n2. Catnip (organic)\n3. Delete windows system folder" },
  { id: "sys-logs", name: "System Logs", type: "folder", parentId: "system", icon: FiFolder },
  { id: "kernel-config", name: "kernel_conf.sys", type: "file", parentId: "system", icon: FiFileText, content: "BOOT_MODE=PURR\nMAX_LIVES=9\nLITTER_BOX_STATUS=CLEAN" },
  { id: "boot-log", name: "boot_purr.log", type: "file", parentId: "sys-logs", icon: FiFileText, content: "[00:00:01] Booting core system...\n[00:00:02] Initializing whiskers...\n[00:00:03] Desktop ready. Feed me." },
]

export default function FileExplorer() {
  const openWindow = useWindowStore((state) => state.openWindow) // Connect to global store
  const [currentFolder, setCurrentFolder] = useState("home") 
  const [history, setHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const currentFiles = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery) {
      return files.filter(f => f.name.toLowerCase().includes(trimmedQuery))
    }
    return files.filter(f => f.parentId === currentFolder)
  }, [currentFolder, searchQuery])

  const navigateTo = (folderId) => {
    setHistory([...history, currentFolder])
    setCurrentFolder(folderId)
    setSearchQuery("")
  }

  const navigateBack = () => {
    const newHistory = [...history]
    const prev = newHistory.pop()
    setCurrentFolder(prev || "home")
    setHistory(newHistory)
    setSearchQuery("")
  }

  const handleSidebarClick = (locationId) => {
    setHistory([]) 
    setCurrentFolder(locationId)
    setSearchQuery("")
  }

  const handleFileItemClick = (file) => {
    if (file.type === "folder") {
      navigateTo(file.id)
      return
    }

    const isImage = file.icon === FiImage
    const ViewerComponent = isImage ? ImageViewer : TextViewer

    openWindow({
      id: `file-view-${file.id}`,
      title: file.name,
      component: () => <ViewerComponent fileContent={file.content} />,
      width: isImage ? 400 : 360,
      height: isImage ? 350 : 300,
      x: window.innerWidth / 2 - 180,
      y: window.innerHeight / 2 - 150,
    })
  }

  const getCurrentPathName = () => {
    if (searchQuery.trim()) return `Search Results for "${searchQuery}"`
    if (currentFolder === "home") return "Home"
    if (currentFolder === "system") return "System"
    const found = files.find(f => f.id === currentFolder)
    return found ? found.name : "Root"
  }

  return (
    <div className="flex flex-col h-full bg-white font-sans text-slate-700 select-none relative">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50 shrink-0">
        <button 
          disabled={history.length === 0 || searchQuery.trim() !== ""}
          onClick={navigateBack}
          className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors"
        >
          <FiChevronLeft size={18} />
        </button>
        
        <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-500 font-medium truncate">
          {getCurrentPathName()}
        </div>
        
        <div className="relative">
          <FiSearch size={16} className="absolute left-2 top-1.5 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-slate-200 rounded-md py-1 pl-7 pr-2 text-xs w-36 focus:border-purple-300 outline-none" 
            placeholder="Search all files..." 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r border-slate-100 p-2 flex flex-col gap-1 bg-slate-50/30">
          <div className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1 tracking-wider">Locations</div>
          
          <button 
            onClick={() => handleSidebarClick("home")} 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${currentFolder === "home" ? "bg-purple-50 text-purple-700 font-medium" : "hover:bg-slate-100"}`}
          >
            <FiHome size={16} /> Home
          </button>
          
          <button 
            onClick={() => handleSidebarClick("system")} 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${currentFolder === "system" ? "bg-purple-50 text-purple-700 font-medium" : "hover:bg-slate-100"}`}
          >
            <FiHardDrive size={16} /> System
          </button>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-4 grid grid-cols-3 sm:grid-cols-4 gap-4 content-start overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {currentFiles.map((file) => (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={file.id}
                onClick={() => handleFileItemClick(file)}
                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-purple-50/80 group transition-all duration-150 border border-transparent hover:border-purple-100"
              >
                <div className="text-4xl text-slate-400 group-hover:text-purple-500 transition-colors">
                  <file.icon strokeWidth={1.2} />
                </div>
                <span className="text-xs text-center break-all w-full line-clamp-2 px-1 text-slate-600 group-hover:text-slate-900">
                  {file.name}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
          
          {currentFiles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center pt-8 text-slate-400 text-xs italic">
              No matching files found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}