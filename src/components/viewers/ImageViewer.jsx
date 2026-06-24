"use client"
export default function ImageViewer({ fileContent }) {
  return (
    <div className="p-4 bg-white h-full flex items-center justify-center overflow-hidden">
      <img 
        src={fileContent} 
        alt="Preview" 
        draggable="false"
        className="max-w-full max-h-full object-contain rounded-md shadow-lg" 
      />
    </div>
  )
}