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

      const timePart = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "")

      if (isMobile) {
        // Mobile: Show only time
        setDateTime(timePart)
      } else {
        // Desktop: Show full date and time
        const datePart = now
          .toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
          .replace(",", "")

        const formatted = `${datePart} ${timePart}`
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
        "text-foreground z-1 ml-2 text-sm font-semibold tracking-wider md:font-medium md:tracking-normal",
        className
      )}
    >
      {dateTime}
    </div>
  )
}
