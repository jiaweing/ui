"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const lightBackgrounds = [
  "26-Tahoe-Beach-Dawn.png",
  "26-Tahoe-Beach-Day.png",
  "26-Tahoe-Light-6K.png",
]

const darkBackgrounds = [
  "26-Tahoe-Beach-Dusk.png",
  "26-Tahoe-Beach-Night.png",
  "26-Tahoe-Dark-6K.png",
]

export function ThemeBackground() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const isDarkMode =
      theme === "dark" || (theme === "system" && systemTheme === "dark")
    const backgroundsToUse = isDarkMode ? darkBackgrounds : lightBackgrounds
    const randomBackground =
      backgroundsToUse[Math.floor(Math.random() * backgroundsToUse.length)]

    setBackgroundImage(randomBackground)
  }, [theme, systemTheme, mounted])

  if (!mounted || !backgroundImage) {
    return null
  }

  return (
    <div
      className="fixed inset-0 -z-10 m-2 rounded-4xl bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/backgrounds/${backgroundImage})`,
      }}
    />
  )
}
