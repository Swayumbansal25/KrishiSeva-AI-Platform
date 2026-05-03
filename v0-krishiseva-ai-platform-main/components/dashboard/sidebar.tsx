"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Upload,
  Sprout,
  LayoutDashboard,
  History,
  Leaf,
  LogOut,
} from "lucide-react"

const navItems = [
  { href: "/dashboard/upload", label: "Upload Data", icon: Upload },
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/recommendations", label: "Crop Recommendations", icon: Sprout },
  { href: "/dashboard/history", label: "History", icon: History },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/"
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-6 py-6">
        <Leaf className="h-6 w-6 text-sidebar-primary" />
        <span className="font-serif text-xl font-bold text-sidebar-foreground">
          krishiseva
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <button
            onClick={handleLogout}
            suppressHydrationWarning
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}