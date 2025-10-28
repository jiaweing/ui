import { SiteHeader } from "@/components/site-header"
import { ResizableWindow } from "@/components/resizable-window"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex-1 flex items-start justify-center pt-2 pb-4">
        <ResizableWindow>
          {children}
        </ResizableWindow>
      </div>
      {/* <SiteFooter /> */}
    </div>
  )
}
