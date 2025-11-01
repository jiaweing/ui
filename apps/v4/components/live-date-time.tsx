"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function LiveDateTime({ className }: { className?: string }) {
  const [dateTime, setDateTime] = useState("")
  const isMobile = useIsMobile()

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const mobileTimePart = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })

      const desktopTimePart = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "")

      if (isMobile) {
        // Mobile: Show only time without AM/PM (24-hour format)
        setDateTime(mobileTimePart)
      } else {
        // Desktop: Show full date and time with AM/PM
        const datePart = now
          .toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
          .replace(",", "")

        const formatted = `${datePart} ${desktopTimePart}`
        setDateTime(formatted)
      }
    }

    // Update immediately
    updateDateTime()

    // Update every second
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <div
      className={cn(
        "text-foreground z-1 ml-2 text-sm font-semibold tracking-wide md:font-medium md:tracking-normal",
        className
      )}
    >
      {dateTime}
    </div>
  )
}
