import Link from "next/link"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/lib/config"
import { Button } from "@/registry/new-york-v4/ui/button"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="z-1 h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        {/* <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense> */}
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/jiaweing/ui", {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  })
  const json = await data.json()

  const formattedCount =
    json.stargazers_count >= 1000
      ? `${Math.round(json.stargazers_count / 1000)}k`
      : json.stargazers_count.toLocaleString()

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  )
}
