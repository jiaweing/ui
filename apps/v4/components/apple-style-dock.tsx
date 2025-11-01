"use client"

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/dock"
import {
  BarChart3,
  BookOpen,
  Component,
  FolderOpen,
  Package,
  Palette,
  SwatchBook,
} from "lucide-react"
import { useRouter } from "next/navigation"

const dockData = [
  {
    title: "Docs",
    icon: (
      <BookOpen className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/docs/installation",
  },
  {
    title: "Components",
    icon: (
      <Component className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/docs/components",
  },
  {
    title: "Blocks",
    icon: (
      <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/blocks",
  },
  {
    title: "Charts",
    icon: (
      <BarChart3 className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/charts/area",
  },
  {
    title: "Directory",
    icon: (
      <FolderOpen className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/docs/directory",
  },
  {
    title: "Themes",
    icon: (
      <Palette className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/themes",
  },
  {
    title: "Colors",
    icon: (
      <SwatchBook className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/colors",
  },
]

export function AppleStyleDock() {
  const router = useRouter()

  return (
    <div className="fixed bottom-4 left-1/2 z-50 hidden max-w-full -translate-x-1/2 md:block">
      <Dock className="items-end pb-3">
        {dockData.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full"
            onClick={() => router.push(item.href)}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
