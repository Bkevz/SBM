import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

export function SalesMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">KSh 127,450</div>
          <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12.5% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8.2% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">KSh 1,245</div>
          <div className="flex items-center text-xs text-destructive">
            <TrendingDown className="h-3 w-3 mr-1" />
            -2.1% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <div className="flex items-center text-xs text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +15.3% from last month
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
