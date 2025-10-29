import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"
import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-slot="layout"
      className="over-hidden relative z-10 flex min-h-svh flex-col"
    >
      <SiteHeader />
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      {/* <SiteFooter /> */}
    </div>
  )
}
