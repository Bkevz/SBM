import { SalesAnalytics } from "@/components/sales/sales-analytics"

export default function SalesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sales Analytics</h2>
        <p className="text-muted-foreground">Track your sales performance and trends</p>
      </div>
      <SalesAnalytics />
    </div>
  )
}
