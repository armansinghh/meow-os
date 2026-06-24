"use client"
import { useState, useEffect, useCallback } from "react"
import { FaCat } from "react-icons/fa6"

export default function CatFactWidget() {
    const [fact, setFact] = useState("")
    const [loading, setLoading] = useState(false)
    const [cooldown, setCooldown] = useState(false)

    const handleManualFetch = useCallback(async () => {
        if (loading || cooldown) return
        
        setLoading(true)
        setCooldown(true)

        try {
            const res = await fetch("https://catfact.ninja/fact")
            if (!res.ok) throw new Error()
            const data = await res.json()
            setFact(data.fact)
        } catch {
            setFact("Cats sleep 12-16 hours a day. 😴")
        } finally {
            setLoading(false)
            setTimeout(() => setCooldown(false), 7000)
        }
    }, [loading, cooldown])

    useEffect(() => {
        let active = true

        const loadInitialFact = async () => {
            setLoading(true)
            try {
                const res = await fetch("https://catfact.ninja/fact")
                if (!res.ok) throw new Error()
                const data = await res.json()
                
                if (active) {
                    setFact(data.fact)
                }
            } catch {
                if (active) {
                    setFact("Cats sleep 12-16 hours a day. 😴")
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        loadInitialFact()

        return () => {
            active = false
        }
    }, [])

    return (
        <div className="w-64 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 text-white select-none shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">
                <FaCat className="text-white/50" />
                Cat Fact
            </div>
            
            {/* Fact Body Display */}
            <div className="text-sm text-white/80 leading-relaxed min-h-15 flex items-center">
                {loading && !fact ? (
                    <span className="text-white/40 italic animate-pulse">Whispering to cats...</span>
                ) : (
                    <p className="animate-in fade-in duration-300">{fact}</p>
                )}
            </div>
            
            {/* Action Trigger Button */}
            <button
                onClick={handleManualFetch}
                disabled={cooldown || loading}
                className="text-xs text-white/40 hover:text-white/70 transition-colors text-left disabled:opacity-30 disabled:cursor-not-allowed mt-1 w-max"
            >
                {cooldown ? "Napping for a moment..." : "Another one →"}
            </button>
        </div>
    )
}