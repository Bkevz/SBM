"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Phone, Mail, User } from "lucide-react"
import { AddCustomerDialog } from "./add-customer-dialog"
import { CustomerHistoryDialog } from "./customer-history-dialog"
import { EditCustomerDialog } from "./edit-customer-dialog"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalPurchases: number
  lastPurchase: string
  status: "active" | "inactive"
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Kamau",
    phone: "+254712345678",
    email: "john@example.com",
    totalPurchases: 15420,
    lastPurchase: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    phone: "+254723456789",
    email: "mary@example.com",
    totalPurchases: 8750,
    lastPurchase: "2024-01-10",
    status: "active",
  },
  {
    id: "3",
    name: "Peter Ochieng",
    phone: "+254734567890",
    email: "peter@example.com",
    totalPurchases: 12300,
    lastPurchase: "2023-12-20",
    status: "inactive",
  },
  {
    id: "4",
    name: "Grace Akinyi",
    phone: "+254745678901",
    email: "grace@example.com",
    totalPurchases: 6890,
    lastPurchase: "2024-01-12",
    status: "active",
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription>Customer since 2023</CardDescription>
                  </div>
                </div>
                <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Purchases:</span>
                    <span className="font-medium">KSh {customer.totalPurchases.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Purchase:</span>
                    <span className="font-medium">{customer.lastPurchase}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedCustomer(customer)}>
                    View History
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingCustomer(customer)}>
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No customers found matching your search.</p>
        </div>
      )}

      <AddCustomerDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onCustomerAdded={(customer) => {
          setCustomers([
            ...customers,
            {
              ...customer,
              id: Date.now().toString(),
              totalPurchases: 0,
              lastPurchase: new Date().toISOString().split("T")[0],
              status: "active" as const,
            },
          ])
        }}
      />
      <CustomerHistoryDialog
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      />
      <EditCustomerDialog
        customer={editingCustomer}
        open={!!editingCustomer}
        onOpenChange={(open) => !open && setEditingCustomer(null)}
        onCustomerUpdated={(updatedCustomer) => {
          setCustomers(customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
        }}
      />
    </div>
  )
}
