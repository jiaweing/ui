import { SiteHeader } from "@/components/site-header"
import { ResizableWindow } from "@/components/resizable-window"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center pt-4 pb-16 px-4">
        <ResizableWindow>
          {children}
        </ResizableWindow>
      </div>
      {/* <SiteFooter /> */}
    </div>
  )
}
