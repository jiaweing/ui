import { siteConfig } from "@/lib/config"

import { ProgressiveBlur } from "./ui/skiper-ui/progressive-blur"

export function SiteFooter() {
  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/0 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
      <ProgressiveBlur
        position="bottom"
        height="150px"
        className="z-0"
        blurAmount="8px"
        useThemeBackground
      />
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-foreground z-1 w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built on top of{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </a>{" "}
            at{" "}
            <a
              href="https://vercel.com/new?utm_source=shadcn_site&utm_medium=web&utm_campaign=docs_cta_deploy_now_callout"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
