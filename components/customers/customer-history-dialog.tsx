"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { ShoppingCart, Calendar, CreditCard } from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalPurchases: number
  lastPurchase: string
  status: "active" | "inactive"
}

interface Purchase {
  id: string
  date: string
  amount: number
  items: string[]
  paymentMethod: "mpesa" | "cash"
  status: "completed" | "pending" | "refunded"
}

interface CustomerHistoryDialogProps {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockPurchases: Purchase[] = [
  {
    id: "1",
    date: "2024-01-15T10:30:00Z",
    amount: 2500,
    items: ["Maize Flour 2kg", "Cooking Oil 1L", "Sugar 1kg"],
    paymentMethod: "mpesa",
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-10T14:20:00Z",
    amount: 1800,
    items: ["Rice 2kg", "Tea Leaves 500g"],
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-05T09:15:00Z",
    amount: 3200,
    items: ["Household Bundle", "Cleaning Supplies"],
    paymentMethod: "mpesa",
    status: "completed",
  },
]

export function CustomerHistoryDialog({ customer, open, onOpenChange }: CustomerHistoryDialogProps) {
  if (!customer) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "refunded":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Purchase History - {customer.name}</span>
          </DialogTitle>
          <DialogDescription>Complete purchase history and customer analytics</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(customer.totalPurchases)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPurchases.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(customer.totalPurchases / mockPurchases.length)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Purchases</h3>
            {mockPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-base">{formatDateTime(purchase.date)}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatCurrency(purchase.amount)}</div>
                      <Badge variant={getStatusColor(purchase.status) as any}>{purchase.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{purchase.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Items: </span>
                      <span className="text-sm">{purchase.items.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
