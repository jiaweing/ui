import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"
import { SiteHeader } from "@/components/site-header"
import { AppleStyleDock } from "@/components/apple-style-dock"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-slot="layout"
      className="over-hidden relative z-10 flex h-screen flex-col overflow-hidden bg-black"
    >
      <SiteHeader />
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      <AppleStyleDock />
      {/* <SiteFooter /> */}
    </div>
  )
}
