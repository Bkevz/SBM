"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Plan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  limits: {
    products: number
    customers: number
    transactions: number
    users: number
  }
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 2000,
    interval: "month",
    features: [
      "Up to 100 products",
      "Up to 500 customers",
      "Basic M-Pesa integration",
      "Sales reports",
      "Email support",
    ],
    limits: {
      products: 100,
      customers: 500,
      transactions: 1000,
      users: 1,
    },
  },
  {
    id: "business",
    name: "Business",
    price: 5000,
    interval: "month",
    features: [
      "Up to 1,000 products",
      "Up to 2,000 customers",
      "Advanced M-Pesa features",
      "Advanced analytics",
      "Team management (3 users)",
      "Priority support",
      "Custom receipts",
    ],
    limits: {
      products: 1000,
      customers: 2000,
      transactions: 5000,
      users: 3,
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 10000,
    interval: "month",
    features: [
      "Unlimited products",
      "Unlimited customers",
      "Full M-Pesa integration",
      "Advanced reporting",
      "Unlimited team members",
      "24/7 phone support",
      "Custom integrations",
      "Multi-location support",
    ],
    limits: {
      products: -1, // unlimited
      customers: -1,
      transactions: -1,
      users: -1,
    },
  },
]

export function SubscriptionBilling() {
  const [currentPlan] = useState("starter") // Mock current plan
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleUpgrade = async (planId: string) => {
    setLoading(planId)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${plans.find((p) => p.id === planId)?.name} plan`,
      })
    } catch (error) {
      toast({
        title: "Upgrade Failed",
        description: "There was an error processing your upgrade. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const formatLimit = (limit: number) => {
    return limit === -1 ? "Unlimited" : limit.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription & Billing</h2>
        <p className="text-muted-foreground">Choose the plan that fits your business needs</p>
      </div>

      {/* Current Plan Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your current subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold capitalize">{currentPlan} Plan</h3>
              <p className="text-sm text-muted-foreground">Next billing date: February 15, 2024</p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "border-green-500 shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <div className="flex items-center space-x-2">
                {plan.id === "starter" && <Zap className="h-5 w-5 text-accent" />}
                {plan.id === "business" && <Crown className="h-5 w-5 text-primary" />}
                {plan.id === "enterprise" && <Star className="h-5 w-5 text-secondary" />}
                <CardTitle>{plan.name}</CardTitle>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  KSh {plan.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limits */}
              <div className="pt-4 border-t space-y-2">
                <h4 className="font-medium text-sm">Usage Limits:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Products: {formatLimit(plan.limits.products)}</div>
                  <div>Customers: {formatLimit(plan.limits.customers)}</div>
                  <div>Transactions: {formatLimit(plan.limits.transactions)}</div>
                  <div>Team Members: {formatLimit(plan.limits.users)}</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                {currentPlan === plan.id ? (
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? "Processing..." : "Upgrade"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods for subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">MP</span>
                </div>
                <div>
                  <p className="font-medium">M-Pesa</p>
                  <p className="text-sm text-muted-foreground">+254712345678</p>
                </div>
              </div>
              <Badge variant="default">Primary</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
