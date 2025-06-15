import { CustomerManagement } from "@/components/customers/customer-management"

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">Manage your customer database and relationships</p>
      </div>
      <CustomerManagement />
    </div>
  )
}
