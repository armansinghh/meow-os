"use client"
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiBriefcase, FiExternalLink, FiCode, FiCpu, FiLayout, FiPenTool } from "react-icons/fi"

export default function HoomanInfo() {
  const socials = [
    { name: "GitHub", icon: FiGithub, url: "https://github.com/armansinghh", color: "hover:text-white hover:bg-slate-800" },
    { name: "LinkedIn", icon: FiLinkedin, url: "https://linkedin.com/in/armansinghh", color: "hover:text-white hover:bg-blue-600" },
    { name: "Email", icon: FiMail, url: "mailto:armansingh6692@gmail.com", color: "hover:text-white hover:bg-rose-500" },
  ]

  const projects = [
    { title: "Buzz", desc: "Full-stack social platform", url: "https://github.com/armansinghh/buzz-social" },
    { title: "Handwriting → Text", desc: "CRNN-based ML model", url: "https://github.com/armansinghh/handwriting-crnn" }
  ]

  const techStack = {
    Languages: ["C++", "Python", "JavaScript", "TypeScript"],
    Web: ["React", "Next.js", "Tailwind", "Firebase"],
    "AI/ML": ["ML Pipelines", "CRNN", "System Design"],
    Design: ["Adobe Suite", "Canva", "After Effects"]
  }

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#fcfbf9] text-slate-800 overflow-hidden">
      
      {/* LEFT COLUMN: Profile */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col items-center justify-center shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 mb-4 shrink-0 aspect-square">
          <img 
            src="https://avatars.githubusercontent.com/u/109358065?s=400" 
            alt="Avatar" 
            draggable="false" 
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full object-cover" 
          />
        </div>
        <h2 className="text-lg font-bold text-slate-800 text-center">Arman Singh</h2>
        <p className="text-xs font-medium text-purple-600 mb-6 text-center uppercase tracking-wider">AI & DS Undergrad</p>
        <div className="w-full flex flex-col gap-2">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 shadow-sm transition-all ${s.color}`}>
              <s.icon size={14} /> {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Bio & Skills */}
      <div className="flex-1 p-8 overflow-y-auto scrollbar-none">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">About Me</h1>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          AI & Data Science undergraduate at MITS Gwalior. I love building practical software that blends machine learning with modern web technologies. I focus on tight UI/UX and AI woven naturally into apps.
        </p>

        {/* Featured Projects */}
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Featured Projects</h3>
        <div className="grid grid-cols-1 gap-2 mb-6">
          {projects.map((p) => (
            <a key={p.title} href={p.url} target="_blank" className="group flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-sm">
              <div>
                <div className="font-semibold text-sm text-slate-800">{p.title}</div>
                <div className="text-[11px] text-slate-500">{p.desc}</div>
              </div>
              <FiExternalLink className="text-slate-400 group-hover:text-purple-500" size={14} />
            </a>
          ))}
        </div>

        {/* Tech Stack Categories */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(techStack).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                {category === "Languages" && <FiCode size={14}/>}
                {category === "Web" && <FiLayout size={14}/>}
                {category === "AI/ML" && <FiCpu size={14}/>}
                {category === "Design" && <FiPenTool size={14}/>}
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="p-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[12px] font-medium border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}