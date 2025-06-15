import { PaymentManagement } from "@/components/payments/payment-management"

export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">Process M-Pesa payments and track transactions</p>
      </div>
      <PaymentManagement />
    </div>
  )
}
