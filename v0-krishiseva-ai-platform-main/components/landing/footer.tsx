import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary px-6 py-10 text-primary-foreground md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          <span className="font-serif text-lg font-bold">krishiseva</span>
        </div>
        <p className="text-sm text-primary-foreground/70">
          AI-powered agricultural intelligence for smarter farming.
        </p>
        <p className="text-xs text-primary-foreground/50">
          {"2026 Krishiseva. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
