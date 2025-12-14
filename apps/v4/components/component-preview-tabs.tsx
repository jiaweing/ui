"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

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

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const { theme, systemTheme } = useTheme()

  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark")

  const randomBackground = React.useMemo(() => {
    const backgroundsToUse = isDarkMode ? darkBackgrounds : lightBackgrounds
    return backgroundsToUse[Math.floor(Math.random() * backgroundsToUse.length)]
  }, [isDarkMode])
  return (
    <div
      className={cn(
        "group relative mt-4 mb-12 flex flex-col gap-2 rounded-lg border",
        className
      )}
      {...props}
    >
      <div data-slot="preview" className="overflow-hidden rounded-t-lg">
        <div
          data-align={align}
          className={cn(
            "preview flex w-full justify-center bg-cover bg-center bg-no-repeat data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
            chromeLessOnMobile ? "sm:p-10" : "h-[450px] p-10"
          )}
          style={{
            backgroundImage: `url(/backgrounds/${randomBackground})`,
          }}
        >
          {component}
        </div>
        {!hideCode && (
          <div
            data-slot="code"
            className="overflow-hidden [&_[data-rehype-pretty-code-figure]]:!m-0 [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-[400px]"
          >
            {source}
          </div>
        )}
      </div>
    </div>
  )
}
