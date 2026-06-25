# meowOS

A browser based desktop operating system with a cat theme.

**Live:** [meowos-web.vercel.app](https://meowos-web.vercel.app)

---

## what it is

meowOS is a fully functional desktop environment running in the browser. It has a real window manager, multiple apps, a taskbar, a boot sequence, and persistent settings and it's all themed around cats.

---

## available apps

| App | Description |
|---|---|
| MeowPad | text editor with autosave and character limit |
| PawShell | terminal emulator with command history and easter eggs |
| PawWatch | analog clock with cat ears |
| Control Paw-nel | settings panel to change wallpapers and sys info |
| File Cat-alog | file explorer with sidebar navigation |
| PrrSurf | browser with pinned working sites |
| Hooman Info | about page for the developer |

---

## desktop widgets

Draggable, position persistent widgets that are on desktop:

1. Clock Widget - time, date, greeting, and a dynamic day/night icon
2. Sticky Note - quick notes (saved to localStorage)
3. Random Cat - pulls a random cat image from The Cat API
4. Cat Fact - daily cat facts from catfact.ninja

---

## features

1. Boot screen - line by line kernel text followed by a logo, then routes to the desktop
2. Shutdown screen - sleep state with a glowing wake button
3. Window manager - open, close, focus, minimize, maximize with smooth animations
4. Taskbar - pinned app icons with open/focused dot indicators, PawMenu, and system tray
5. PawMenu - app launcher with search and shutdown button
6. System tray - WiFi/Bluetooth/Catnap toggles, working brightness and volume sliders
7. Wallpaper picker - three built in cat wallpapers + custom URL wallpaper with link validation
8. localStorage persistence - wallpaper choice and widget positions survive refreshes

---

## tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| State | Zustand (with persist middleware) |
| Drag / Resize | react-rnd |
| Animations | Framer Motion |
| Icons | react-icons |

---

## running locally

```bash
git clone https://github.com/armansinghh/meow-os
cd meow-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). 
The app will redirect to the shutdown screen, click to boot.

---

## project structure

```
src/
├── app/
│   ├── page.jsx          # desktop route + boot check
│   ├── boot/page.jsx     # boot sequence
│   └── shutdown/page.jsx # shutdown / sleep screen
├── apps/                 # individual apps
├── components/
│   ├── desktop/          # desktop, widgets
│   ├── viewers/          # txt and image file viewers
│   └── windows/          # window manager
└── store/
    └── useWindowStore.js # zustand store (windows + wallpaper)
```

---
