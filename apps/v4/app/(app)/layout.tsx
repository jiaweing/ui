import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="bg-background mx-8 mt-2 mb-4 flex flex-1 flex-col overflow-hidden rounded-3xl shadow-2xl backdrop-blur-3xl">
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
