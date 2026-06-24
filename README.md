# 🐾 meowOS

A browser-based desktop operating system with a cat theme.

**Live:** [meowos-web.vercel.app](https://meowos-web.vercel.app) · **Repo:** [github.com/armansinghh/meow-os](https://github.com/armansinghh/meow-os)

---

## What it is

meowOS is a fully functional desktop environment running in the browser. It has a real window manager, multiple apps, a taskbar, a boot sequence, and persistent settings and it's all themed around cats.

---

## Apps

| App | Description |
|---|---|
| **MeowPad** | Distraction-free text editor with autosave and character limit |
| **PawShell** | Terminal emulator with command history, Easter eggs, and a matrix mode |
| **PawWatch** | Analog clock with cat ears and a digital readout |
| **Control Paw-nel** | Settings panel — change wallpapers, add custom image URLs |
| **File Cat-alog** | File explorer with sidebar navigation |
| **PrrSurf** | In-OS browser with a cat-themed home screen |
| **Hooman Info** | About page / portfolio card |

---

## Desktop Widgets

Draggable, position-persistent widgets that live on the desktop:

- **Clock Widget** — time, date, greeting, and a dynamic day/night icon
- **Sticky Note** — quick notes saved to localStorage
- **Random Cat** — pulls a random cat image from The Cat API
- **Cat Fact** — daily cat facts from catfact.ninja

---

## Features

- **Boot screen** — line-by-line kernel text followed by a logo splash, then routes to the desktop
- **Shutdown screen** — sleep state with a glowing wake button
- **Window manager** — open, close, focus, minimize, maximize with smooth animations
- **Taskbar** — pinned app icons with open/focused dot indicators, PawMenu, and system tray
- **PawMenu** — app launcher with live search and shutdown button
- **System tray** — WiFi/Bluetooth/Catnap toggles, brightness and volume sliders
- **Wallpaper picker** — three built-in cat wallpapers plus custom URL input with validation
- **localStorage persistence** — wallpaper choice and widget positions survive refreshes

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| State | Zustand (with persist middleware) |
| Drag / Resize | react-rnd |
| Animations | Framer Motion |
| Icons | react-icons |

---

## Running Locally

```bash
git clone https://github.com/armansinghh/meow-os
cd meow-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app will redirect to the shutdown screen on first load — click to boot.

---

## Project Structure

```
src/
├── app/
│   ├── page.jsx          # Desktop entry + boot check
│   ├── boot/page.jsx     # Boot sequence
│   └── shutdown/page.jsx # Shutdown / sleep screen
├── apps/                 # Individual app components
├── components/
│   ├── desktop/          # Desktop, DraggableWidget, widgets
│   ├── taskbar/          # Taskbar, PawMenu, TrayModal, SystemTray
│   └── windows/          # Window chrome (drag, resize, controls)
└── store/
    └── useWindowStore.js # Zustand store (windows + wallpaper)
```

---

Made with ❤️ by [Arman Singh](https://github.com/armansinghh)