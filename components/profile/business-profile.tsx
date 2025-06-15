"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, Building, MapPin, Phone, Mail } from "lucide-react"

export function BusinessProfile() {
  const [formData, setFormData] = useState({
    businessName: "Kamau General Store",
    businessType: "retail",
    description: "A family-owned general store serving the local community with quality products at affordable prices.",
    address: "123 Kenyatta Avenue, Nairobi",
    phone: "+254712345678",
    email: "info@kamaustore.co.ke",
    currency: "KES",
    taxPin: "P051234567A",
    businessLicense: "BL/2023/001234",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call to update business profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile Updated",
        description: "Your business profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Business Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Business Logo</span>
          </CardTitle>
          <CardDescription>Upload your business logo to appear on receipts and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
              <Building className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <p className="text-sm text-muted-foreground mt-2">Recommended: 200x200px, PNG or JPG</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Update your business details and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Business Address</span>
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxPin">KRA PIN</Label>
                <Input
                  id="taxPin"
                  value={formData.taxPin}
                  onChange={(e) => setFormData({ ...formData, taxPin: e.target.value })}
                  placeholder="P051234567A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License</Label>
                <Input
                  id="businessLicense"
                  value={formData.businessLicense}
                  onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })}
                  placeholder="BL/2023/001234"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
