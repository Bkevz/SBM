"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Store,
  LogOut,
  Bell,
  Crown,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Sales",
    url: "/dashboard/sales",
    icon: BarChart3,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Subscription",
    url: "/dashboard/subscription",
    icon: Crown,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar className="bg-black border-r border-gray-800">
      <SidebarHeader className="bg-black border-b border-gray-800">
        <div className="flex items-center space-x-2 px-4 py-4">
          <Store className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-white">Biashara Pro</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 px-4 py-2 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-lg text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-black hover:to-primary/20 relative",
                          isActive && "sidebar-active bg-gradient-to-r from-black to-primary/30"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
                        )}
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-black border-t border-gray-800">
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <div className="px-3 py-3 border-b border-gray-800">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-medium">{user?.email}</p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-gradient-to-r hover:from-black hover:to-primary/20 transition-all duration-200" 
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
