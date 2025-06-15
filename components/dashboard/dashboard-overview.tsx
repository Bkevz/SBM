"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/charts/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Package, Users, CreditCard, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-header">KSh 45,231</div>
            <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-header">127</div>
            <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +5 new this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-header">89</div>
            <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12 new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-header">+12.5%</div>
            <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            Monthly growth
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-header">Sales Overview</CardTitle>
            <CardDescription className="text-medium">Your sales performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-header">Recent Sales</CardTitle>
            <CardDescription className="text-medium">Latest transactions from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
