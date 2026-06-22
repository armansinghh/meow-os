"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FiFolder, FiFile, FiChevronLeft, FiSearch, 
  FiHardDrive, FiHome, FiImage, FiFileText 
} from "react-icons/fi"

// Mock Filesystem
const files = [
  { id: 1, name: "Documents", type: "folder", parentId: null, icon: FiFolder },
  { id: 2, name: "Pictures", type: "folder", parentId: null, icon: FiFolder },
  { id: 3, name: "MeowOS Design.pdf", type: "file", parentId: 1, icon: FiFileText },
  { id: 4, name: "Cat_Photo.png", type: "file", parentId: 2, icon: FiImage },
  { id: 5, name: "Notes.txt", type: "file", parentId: 1, icon: FiFileText },
]

export default function FileExplorer() {
  const [currentFolder, setCurrentFolder] = useState(null) // null = root
  const [history, setHistory] = useState([])

  const currentFiles = files.filter(f => f.parentId === currentFolder)

  const navigateTo = (folderId) => {
    setHistory([...history, currentFolder])
    setCurrentFolder(folderId)
  }

  const navigateBack = () => {
    const newHistory = [...history]
    const prev = newHistory.pop()
    setCurrentFolder(prev)
    setHistory(newHistory)
  }

  return (
    <div className="flex flex-col h-full bg-white font-sans text-slate-700">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50">
        <button 
          disabled={currentFolder === null}
          onClick={navigateBack}
          className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors"
        >
          <FiChevronLeft size={18} />
        </button>
        
        {/* Breadcrumb Path */}
        <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-500 font-medium">
          {currentFolder === null ? "/root" : `/folder-${currentFolder}`}
        </div>
        
        <div className="relative">
          <FiSearch size={16} className="absolute left-2 top-1.5 text-slate-400" />
          <input 
            className="bg-white border border-slate-200 rounded-md py-1 pl-7 pr-2 text-xs w-32 focus:border-purple-300 outline-none" 
            placeholder="Search..." 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r border-slate-100 p-2 flex flex-col gap-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Locations</div>
          <button onClick={() => setCurrentFolder(null)} className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-slate-100">
            <FiHome size={16} /> Home
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-slate-100">
            <FiHardDrive size={16} /> System
          </button>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {currentFiles.map((file) => (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={file.id}
                onDoubleClick={() => file.type === 'folder' && navigateTo(file.id)}
                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-purple-50 group transition-colors"
              >
                <div className="text-4xl text-slate-400 group-hover:text-purple-400 transition-colors">
                  <file.icon strokeWidth={1} />
                </div>
                <span className="text-xs text-center break-words w-full truncate px-1">
                  {file.name}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}