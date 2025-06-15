"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center gap-2 px-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/notifications">
            <Bell className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
