import { SiteHeader } from "@/components/site-header"
import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
      {/* <SiteFooter /> */}
    </div>
  )
}
