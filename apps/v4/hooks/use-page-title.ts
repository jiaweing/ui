"use client"

import { usePathname } from "next/navigation"

export function usePageTitle() {
  const pathname = usePathname()

  // Convert pathname to a readable title
  const getPageTitle = () => {
    if (pathname === "/") return "jiaweing/ui"

    // Remove leading slash and split by slashes
    const segments = pathname.substring(1).split("/")

    // Convert segments to title case and join
    const title = segments
      .map((segment) => {
        // Handle special cases
        if (segment === "docs") return "Documentation"
        if (segment === "components") return "Components"
        if (segment === "blocks") return "Blocks"
        if (segment === "charts") return "Charts"
        if (segment === "themes") return "Themes"
        if (segment === "colors") return "Colors"
        if (segment === "directory") return "Directory"

        // Convert kebab-case to Title Case
        return segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      })
      .join(" › ")

    return title
  }

  return getPageTitle()
}
