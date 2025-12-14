import Link from "next/link"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Battery } from "lucide-react"

import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { LiveDateTime } from "@/components/live-date-time"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SiteConfig } from "@/components/site-config"
// import blocks from "@/registry/__blocks__.json"
import { Button } from "@/registry/new-york-v4/ui/button"

import { GitHubLink } from "./github-link"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 pt-1 pr-8 pl-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <LiveDateTime className="md:hidden" />
          <MobileNav tree={pageTree} items={siteConfig.navItems} />
          <Button asChild variant="ghost" className="z-1 hidden h-8 lg:flex">
            <Link href="/">
              <Icons.logo className="size-5" />
              <div className="ml-2 font-semibold">{siteConfig.name}</div>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className="z-1 hidden lg:flex" />
          <div className="ml-auto flex items-center gap-1 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                tree={pageTree}
                colors={colors}
                navItems={siteConfig.navItems}
              />
            </div>
            {/* <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            /> */}
            <GitHubLink />
            {/* <Separator orientation="vertical" className="3xl:flex z-1 hidden" /> */}
            <SiteConfig className="3xl:flex z-1 hidden" />
            {/* <Separator orientation="vertical" /> */}
            <ModeSwitcher />
            <LiveDateTime className="hidden lg:block" />
            <Battery className="text-foreground z-1 ml-2 md:hidden" />
            <Button
              asChild
              size="sm"
              className="hidden h-[31px] rounded-lg sm:flex"
            >
              <Link href="/create">
                <HugeiconsIcon icon={PlusSignIcon} />
                New Project
              </Link>
            </Button>
            <Button asChild size="sm" className="h-[31px] rounded-lg sm:hidden">
              <Link href="/create">
                <HugeiconsIcon icon={PlusSignIcon} />
                New
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
