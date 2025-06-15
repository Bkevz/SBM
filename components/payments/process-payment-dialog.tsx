"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Smartphone } from "lucide-react"

interface ProcessPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentProcessed: (payment: any) => void
}

export function ProcessPaymentDialog({ open, onOpenChange, onPaymentProcessed }: ProcessPaymentDialogProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    amount: "",
    method: "",
    items: "",
  })
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Simulate M-Pesa API call
      if (formData.method === "mpesa") {
        // In a real app, this would call your FastAPI backend
        // which would then call the Safaricom M-Pesa API
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const payment = {
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          amount: Number.parseFloat(formData.amount),
          method: formData.method,
          items: formData.items.split(",").map((item) => item.trim()),
          transactionId: `QA${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        }

        onPaymentProcessed(payment)

        toast({
          title: "Payment Initiated",
          description: `M-Pesa payment request sent to ${formData.customerPhone}. Waiting for confirmation.`,
        })
      } else {
        // Cash payment
        const payment = {
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          amount: Number.parseFloat(formData.amount),
          method: formData.method,
          items: formData.items.split(",").map((item) => item.trim()),
        }

        onPaymentProcessed({ ...payment, status: "completed" })

        toast({
          title: "Payment Recorded",
          description: "Cash payment has been recorded successfully.",
        })
      }

      // Reset form
      setFormData({
        customerName: "",
        customerPhone: "",
        amount: "",
        method: "",
        items: "",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing the payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Process Payment</span>
          </DialogTitle>
          <DialogDescription>
            Process a new payment transaction. For M-Pesa payments, the customer will receive a prompt on their phone.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="+254712345678"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KSh)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="items">Items (comma-separated)</Label>
              <Textarea
                id="items"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                placeholder="Maize Flour 2kg, Cooking Oil 1L, Sugar 1kg"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? "Processing..." : "Process Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
