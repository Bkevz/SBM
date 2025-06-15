"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDateTime, generateReceiptNumber } from "@/lib/utils"
import { Download, PrinterIcon as Print, Building, Phone, Mail, MapPin } from "lucide-react"

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

interface ReceiptDialogProps {
  payment: Payment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock business info - in real app, this would come from business profile
const businessInfo = {
  name: "Kamau General Store",
  address: "123 Kenyatta Avenue, Nairobi",
  phone: "+254712345678",
  email: "info@kamaustore.co.ke",
  kraPin: "P051234567A",
  businessLicense: "BL/2023/001234",
}

export function ReceiptDialog({ payment, open, onOpenChange }: ReceiptDialogProps) {
  if (!payment) return null

  const receiptNumber = generateReceiptNumber()
  const subtotal = payment.amount
  const tax = subtotal * 0.16 // 16% VAT
  const total = subtotal + tax

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const receiptContent = document.getElementById("receipt-content")?.innerHTML
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${receiptNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .receipt { max-width: 400px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 20px; }
              .separator { border-top: 1px dashed #ccc; margin: 10px 0; }
              .total { font-weight: bold; font-size: 1.2em; }
            </style>
          </head>
          <body>
            <div class="receipt">${receiptContent}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Receipt</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Print className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6" id="receipt-content">
            {/* Business Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold">{businessInfo.name}</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{businessInfo.address}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{businessInfo.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>{businessInfo.email}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Receipt Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Receipt No:</span>
                <span className="font-mono">{receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{formatDateTime(payment.date)}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{payment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{payment.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="capitalize">{payment.method}</span>
              </div>
              {payment.transactionId && (
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-xs">{payment.transactionId}</span>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Items */}
            <div className="space-y-2">
              <h3 className="font-semibold">Items Purchased:</h3>
              {payment.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item}</span>
                  <span>-</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (16%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>Thank you for your business!</p>
              <p>KRA PIN: {businessInfo.kraPin}</p>
              <p>Business License: {businessInfo.businessLicense}</p>
              <p className="mt-2">Goods sold are not returnable</p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
