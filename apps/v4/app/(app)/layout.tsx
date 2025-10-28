import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <SiteHeader />
      <main className="bg-background m-8 flex h-[calc(100vh-50rem)] flex-1 flex-col rounded-3xl backdrop-blur-3xl">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
