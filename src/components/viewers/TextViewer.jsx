"use client"
export default function TextViewer({ fileContent }) {
  return (
    <div className="p-4 font-mono text-xs text-slate-600 bg-[#fcfbf9] h-full overflow-y-auto selection:bg-purple-200 whitespace-pre-wrap leading-relaxed">
      {fileContent || "No content."}
    </div>
  )
}