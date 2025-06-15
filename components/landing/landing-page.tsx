import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Smartphone, BarChart3, Receipt, Users, Shield } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Store className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">Biashara Pro</span>
        </div>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Grow Your Kenyan Business with <span className="text-green-600">Smart Management</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Complete business management solution with inventory tracking, M-Pesa payments, and sales analytics designed
          specifically for Kenyan entrepreneurs.
        </p>
        <div className="space-x-4">
          <Link href="/auth/register">
            <Button size="lg" className="px-8 py-3">
              Start Free Trial
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Run Your Business</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Store className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track stock levels, manage products, and get low-stock alerts</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>M-Pesa Integration</CardTitle>
              <CardDescription>Accept payments instantly with Safaricom M-Pesa integration</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Track performance with detailed sales reports and insights</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Build customer database and track purchase history</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Receipt className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Digital Receipts</CardTitle>
              <CardDescription>Generate professional invoices and receipts automatically</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>Bank-level security with reliable cloud infrastructure</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8">Join thousands of Kenyan businesses already using Biashara Pro</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 Biashara Pro. Made with ❤️ for Kenyan businesses.</p>
      </footer>
    </div>
  )
}
