import MeowPad from "./MeowPad"
import PawShell from "./PawShell"
import PawWatch from "./PawWatch"
import Pawnel from "./PawNel"
import Catalog from "./Catalog"
import PrrSurf from "./PrrSurf"
import { FaPenToSquare, FaTerminal, FaClock, FaGear, FaFolder, FaGlobe } from "react-icons/fa6"

const apps = [
  { id: "meowpad", title: "MeowPad", icon: <FaPenToSquare />, component: MeowPad },
  { id: "pawshell", title: "PawShell", icon: <FaTerminal />, component: PawShell },
  { id: "pawwatch", title: "PawWatch", icon: <FaClock />, component: PawWatch },
  { id: "pawnel", title: "Control Paw-nel", icon: <FaGear />, component: Pawnel },
  { id: "catalog", title: "File Cat-alog", icon: <FaFolder />, component: Catalog },
  { id: "prrsurf", title: "PrrSurf Browser", icon: <FaGlobe />, component: PrrSurf },
]

export default apps