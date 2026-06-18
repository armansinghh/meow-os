import TextEditor from "./TextEditor"
import Terminal from "./Terminal"
import Clock from "./Clock"
import Settings from "./Settings"
import { FaPenToSquare, FaTerminal, FaClock, FaGear } from "react-icons/fa6"

const apps = [
  { id: "text-editor", title: "Text Editor", icon: <FaPenToSquare />, component: TextEditor },
  { id: "terminal", title: "Terminal", icon: <FaTerminal />, component: Terminal },
  { id: "clock", title: "Clock", icon: <FaClock />, component: Clock },
  { id: "settings", title: "Settings", icon: <FaGear />, component: Settings },
]

export default apps