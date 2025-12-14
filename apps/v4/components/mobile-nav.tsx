"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"

import { PAGES_NEW } from "@/lib/docs"
import { showMcpDocs } from "@/lib/flags"
import { type source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/new-york-v4/ui/drawer"

import { ProgressiveBlur } from "./ui/skiper-ui/progressive-blur"

const TOP_LEVEL_SECTIONS = [
  { name: "Get Started", href: "/docs" },
  {
    name: "Components",
    href: "/docs/components",
  },
  {
    name: "Directory",
    href: "/docs/directory",
  },
  {
    name: "MCP Server",
    href: "/docs/mcp",
  },
  {
    name: "Forms",
    href: "/docs/forms",
  },
  {
    name: "Changelog",
    href: "/docs/changelog",
  },
]

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const isDocsPage = pathname?.startsWith("/docs")

  return (
    <>
      {/* Floating Menu Button - Bottom Right */}
      <div
        className={cn(
          "fixed right-6 z-50 lg:hidden",
          isDocsPage ? "bottom-14" : "bottom-6",
          className
        )}
      >
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className={`bg-background/20 hover:bg-background/30 ring-0.5 h-14 w-14 rounded-full border border-white/10 shadow-2xl inset-shadow-2xs backdrop-blur-xl transition-all duration-200`}
            >
              <Menu className="text-foreground size-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[100vh]">
            <ProgressiveBlur
              position="top"
              height="150px"
              className="z-10 rounded-t-4xl"
              blurAmount="50px"
              useThemeBackground
            />
            <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
              <div className="flex flex-col gap-4">
                <div className="text-muted-foreground text-sm font-medium">
                  Menu
                </div>
                <div className="flex flex-col gap-3">
                  <MobileLink href="/" onOpenChange={setOpen}>
                    Home
                  </MobileLink>
                  {items.map((item, index) => (
                    <MobileLink
                      key={index}
                      href={item.href}
                      onOpenChange={setOpen}
                    >
                      {item.label}
                    </MobileLink>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-muted-foreground text-sm font-medium">
                  Sections
                </div>
                <div className="flex flex-col gap-3">
                  {TOP_LEVEL_SECTIONS.map(({ name, href }) => {
                    if (!showMcpDocs && href.includes("/mcp")) {
                      return null
                    }
                    return (
                      <MobileLink key={name} href={href} onOpenChange={setOpen}>
                        {name}
                      </MobileLink>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {tree?.children?.map((group, index) => {
                  if (group.type === "folder") {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="text-muted-foreground text-sm font-medium">
                          {group.name}
                        </div>
                        <div className="flex flex-col gap-3">
                          {group.children.map((item) => {
                            if (item.type === "page") {
                              if (!showMcpDocs && item.url.includes("/mcp")) {
                                return null
                              }
                              return (
                                <MobileLink
                                  key={`${item.url}-${index}`}
                                  href={item.url}
                                  onOpenChange={setOpen}
                                  className="flex items-center gap-2"
                                >
                                  {item.name}{" "}
                                  {PAGES_NEW.includes(item.url) && (
                                    <span className="flex size-2 rounded-full bg-blue-500" />
                                  )}
                                </MobileLink>
                              )
                            }
                          })}
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            <ProgressiveBlur
              position="bottom"
              height="100px"
              className="z-10 rounded-b-4xl"
              blurAmount="50px"
              useThemeBackground
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
