"use client"
import { useState, useEffect, useCallback } from "react"
import { FaCat } from "react-icons/fa6"

export default function RandomCatWidget() {
  const [imageUrl, setImageUrl] = useState("")
  const [isFetching, setIsFetching] = useState(true) 
  const [isImageLoading, setIsImageLoading] = useState(true) 
  const [cooldown, setCooldown] = useState(false)

  const handleManualFetch = useCallback(async () => {
    if (isFetching || cooldown) return 
    
    setIsFetching(true)
    setIsImageLoading(true)
    setCooldown(true)
    
    setImageUrl("")

    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search")
      if (!res.ok) throw new Error("API down")
      const data = await res.json()
      setImageUrl(data[0].url)
    } catch (error) {
      setImageUrl("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80")
    } finally {
      setIsFetching(false)
      setTimeout(() => setCooldown(false), 7000)
    }
  }, [isFetching, cooldown])

  useEffect(() => {
    let active = true

    const fetchInitialCat = async () => {
      try {
        const res = await fetch("https://api.thecatapi.com/v1/images/search")
        if (!res.ok) throw new Error("API down")
        const data = await res.json()
        
        if (active) {
          setImageUrl(data[0].url)
          setIsFetching(false)
        }
      } catch (error) {
        if (active) {
          setImageUrl("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80")
          setIsFetching(false)
        }
      }
    }

    fetchInitialCat()
    return () => { active = false }
  }, [])

  return (
    <div className="w-64 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-lg select-none text-white">
      
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
          <FaCat className="text-white/50" />
          Random Cat
        </div>
      </div>

      {/* Image Container */}
      <div className="w-full h-32 bg-black/40 rounded-xl overflow-hidden relative border border-white/5 shrink-0">
        
        {(isFetching || isImageLoading) && (
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-sm">
            <span className="text-[10px] text-white/30 tracking-widest uppercase font-bold animate-pulse">
              Fetching...
            </span>
          </div>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Random cat"
            draggable="false"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}
      </div>

      {/* Action Trigger */}
      <button
        onClick={handleManualFetch}
        disabled={isFetching || isImageLoading || cooldown}
        className="text-xs text-white/40 hover:text-white/70 transition-colors text-left disabled:opacity-30 disabled:cursor-not-allowed mt-1 w-max"
      >
        {cooldown || isFetching || isImageLoading ? "Napping for a moment..." : "Another one →"}
      </button>
      
    </div>
  )
}