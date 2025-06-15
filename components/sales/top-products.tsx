import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topProducts = [
  {
    name: "Maize Flour 2kg",
    category: "Food",
    sales: 145,
    revenue: 21750,
    trend: "+12%",
  },
  {
    name: "Cooking Oil 1L",
    category: "Food",
    sales: 89,
    revenue: 24920,
    trend: "+8%",
  },
  {
    name: "Sugar 1kg",
    category: "Food",
    sales: 76,
    revenue: 9120,
    trend: "+15%",
  },
  {
    name: "Rice 2kg",
    category: "Food",
    sales: 65,
    revenue: 13000,
    trend: "+5%",
  },
  {
    name: "Tea Leaves 500g",
    category: "Beverages",
    sales: 54,
    revenue: 8100,
    trend: "+22%",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Best performing products by sales volume and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{product.sales} units sold</div>
                  <div className="text-sm text-muted-foreground">KSh {product.revenue.toLocaleString()}</div>
                </div>
                <Badge variant="secondary" className="text-primary">
                  {product.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
