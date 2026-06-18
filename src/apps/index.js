import TextEditor from "./TextEditor"
import Terminal from "./Terminal"
import Clock from "./Clock"

const apps = [
  {
    id: "text-editor",
    title: "Text Editor",
    icon: "📝",
    component: TextEditor,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "🖥️",
    component: Terminal,
  },
  {
    id: "clock",
    title: "Clock",
    icon: "🕐",
    component: Clock,
  },
]

export default apps