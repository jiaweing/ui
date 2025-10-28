"use client"

import { useEffect, useState } from "react"

export function LiveDateTime() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      // Format: Mon Jun 10 9:41 AM
      const datePart = now
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
        .replace(",", "")

      const timePart = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "")

      const formatted = `${datePart} ${timePart}`

      setDateTime(formatted)
    }

    // Update immediately
    updateDateTime()

    // Update every second
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-foreground ml-2 text-sm font-medium">{dateTime}</div>
  )
}
