"use client"

import { usePageTitle } from "@/hooks/use-page-title"
import { ResizableWindow } from "@/components/resizable-window"
import { ThemeBackground } from "@/components/theme-background"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pageTitle = usePageTitle()

  return (
    <>
      <ThemeBackground />
      <div className="absolute top-0 left-1/2 z-50 hidden h-10 w-48 -translate-x-1/2 cursor-pointer rounded-b-2xl bg-black shadow-md transition-transform duration-300 ease-out hover:scale-105 md:block" />
      <div className="flex flex-1 items-center justify-center px-4 md:pt-4 md:pb-16">
        <ResizableWindow title={pageTitle}>{children}</ResizableWindow>
      </div>
    </>
  )
}
