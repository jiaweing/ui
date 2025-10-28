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
      <div className="flex-1 flex items-center justify-center pt-4 pb-16 px-4">
        <ResizableWindow title={pageTitle}>
          {children}
        </ResizableWindow>
      </div>
    </>
  )
}