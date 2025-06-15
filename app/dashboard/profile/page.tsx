import { BusinessProfile } from "@/components/profile/business-profile"

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Business Profile</h2>
        <p className="text-muted-foreground">Manage your business information and settings</p>
      </div>
      <BusinessProfile />
    </div>
  )
}
