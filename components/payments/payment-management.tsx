"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Smartphone, Receipt } from "lucide-react"
import { ProcessPaymentDialog } from "./process-payment-dialog"
import { ReceiptDialog } from "./receipt-dialog"

interface Payment {
  id: string
  customerName: string
  customerPhone: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: "mpesa" | "cash"
  transactionId?: string
  date: string
  items: string[]
}

const mockPayments: Payment[] = [
  {
    id: "1",
    customerName: "John Kamau",
    customerPhone: "+254712345678",
    amount: 1999,
    status: "completed",
    method: "mpesa",
    transactionId: "QA12B3C4D5",
    date: "2024-01-15T10:30:00Z",
    items: ["Maize Flour 2kg", "Cooking Oil 1L"],
  },
  {
    id: "2",
    customerName: "Mary Wanjiku",
    customerPhone: "+254723456789",
    amount: 850,
    status: "completed",
    method: "mpesa",
    transactionId: "QB34C5D6E7",
    date: "2024-01-15T09:15:00Z",
    items: ["Sugar 1kg", "Rice 2kg"],
  },
  {
    id: "3",
    customerName: "Peter Ochieng",
    customerPhone: "+254734567890",
    amount: 2500,
    status: "pending",
    method: "mpesa",
    date: "2024-01-15T11:45:00Z",
    items: ["Electronics Bundle"],
  },
  {
    id: "4",
    customerName: "Grace Akinyi",
    customerPhone: "+254745678901",
    amount: 1200,
    status: "completed",
    method: "cash",
    date: "2024-01-15T08:20:00Z",
    items: ["Household Items"],
  },
]

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerPhone.includes(searchTerm) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "default"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowProcessDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Process Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 6,549</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">M-Pesa Transactions</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">2 pending confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{payment.customerName}</CardTitle>
                  <CardDescription>{payment.customerPhone}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">KSh {payment.amount.toLocaleString()}</div>
                  <Badge variant={getStatusColor(payment.status) as any}>{payment.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-medium capitalize">{payment.method}</span>
                  </div>
                  {payment.transactionId && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-medium">{payment.transactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{formatDate(payment.date)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Items:</div>
                  <div className="text-sm">{payment.items.join(", ")}</div>
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                      View Receipt
                    </Button>
                    {payment.status === "pending" && (
                      <Button variant="outline" size="sm">
                        Check Status
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No payments found matching your search.</p>
        </div>
      )}

      <ProcessPaymentDialog
        open={showProcessDialog}
        onOpenChange={setShowProcessDialog}
        onPaymentProcessed={(payment) => {
          setPayments([
            {
              ...payment,
              id: Date.now().toString(),
              date: new Date().toISOString(),
              status: "pending" as const,
            },
            ...payments,
          ])
        }}
      />
      <ReceiptDialog
        payment={selectedPayment}
        open={!!selectedPayment}
        onOpenChange={(open) => !open && setSelectedPayment(null)}
      />
    </div>
  )
}
