"use client"
import { useState, useRef } from "react"
import { FiRefreshCw, FiHome, FiSearch, FiBook, FiSun, FiPenTool } from "react-icons/fi"

const CAT_APPS = [
    { name: "Catpedia", url: "https://en.wikipedia.org/wiki/Cat", icon: FiBook },
    { name: "Sunbeam Finder", url: "https://www.accuweather.com/en/", icon: FiSun },
    { name: "Sketchpad", url: "https://excalidraw.com/", icon: FiPenTool },
]

export default function PrrSurf() {
    const [url, setUrl] = useState("")
    const iframeRef = useRef(null)

    const refresh = () => {
        if (iframeRef.current && url) iframeRef.current.src = url
    }

    return (
        <div className="flex flex-col h-full bg-[#111111] overflow-hidden rounded-lg">
            {/* 1. TOP CHROME */}
            <div className="h-14 border-b border-white/10 flex items-center px-4 gap-3 bg-[#111111] z-20">
                <button onClick={refresh} className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition"><FiRefreshCw size={16} /></button>

                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-2.5 text-white/30" size={16} />
                    <input
                        disabled
                        placeholder="Searching is for humans... I am currently napping."
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white/40 cursor-not-allowed italic"
                    />
                </div>

                <button onClick={() => setUrl("")} className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition"><FiHome size={16} /></button>
            </div>

            {/* 2. MAIN CONTENT */}
            <div className="flex-1 w-full h-full relative">
                {url === "" ? (
                    <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500">
                        <h1 className="text-7xl font-black mb-12 tracking-tighter">
                            <span className="text-[#4285F4]">P</span>
                            <span className="text-[#EA4335]">r</span>
                            <span className="text-[#FBBC05]">r</span>
                            <span className="text-[#4285F4]">S</span>
                            <span className="text-[#34A853]">e</span>
                            <span className="text-[#EA4335]">a</span>
                            <span className="text-[#FBBC05]">r</span>
                            <span className="text-[#4285F4]">c</span>
                            <span className="text-[#EA4335]">h</span>
                        </h1>

                        <div className="flex gap-6">
                            {CAT_APPS.map((app) => (
                                <button
                                    key={app.name}
                                    onClick={() => setUrl(app.url)}
                                    className="flex flex-col items-center gap-3 w-28 group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-white/10 transition-all shadow-lg border border-white/5">
                                        <app.icon size={28} />
                                    </div>
                                    <span className="text-[11px] font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-wider">
                                        {app.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* BROWSER VIEW */
                    <iframe
                        ref={iframeRef}
                        src={url}
                        className="w-full h-full border-0 bg-white"
                        title="browser"
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                    />
                )}
            </div>
        </div>
    )
}