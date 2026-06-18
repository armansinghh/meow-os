import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata = {
  title: "meowOS",
  description: "A browser-based desktop OS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}