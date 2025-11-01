"use client"

import { ResizableWindow } from "@/components/resizable-window"
import { ThemeBackground } from "@/components/theme-background"
import { usePageTitle } from "@/hooks/use-page-title"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pageTitle = usePageTitle()

  return (
    <>
      <ThemeBackground />
      <div className="flex items-center justify-center px-4 md:flex-1 md:pt-4 md:pb-16">
        <ResizableWindow title={pageTitle}>{children}</ResizableWindow>
      </div>
    </>
  )
}
