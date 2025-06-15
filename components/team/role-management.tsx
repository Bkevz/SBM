"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Users, Mail, Shield } from "lucide-react"
import { InviteUserDialog } from "./invite-user-dialog"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
  status: "active" | "pending" | "inactive"
  invitedDate: string
  lastActive?: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Kamau",
    email: "john@kamaustore.co.ke",
    role: "admin",
    status: "active",
    invitedDate: "2024-01-01T00:00:00Z",
    lastActive: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    email: "mary@kamaustore.co.ke",
    role: "manager",
    status: "active",
    invitedDate: "2024-01-05T00:00:00Z",
    lastActive: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    name: "Peter Ochieng",
    email: "peter@kamaustore.co.ke",
    role: "staff",
    status: "pending",
    invitedDate: "2024-01-14T00:00:00Z",
  },
]

export function RoleManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "manager":
        return "default"
      case "staff":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage team members and their access permissions</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowInviteDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      {/* Role Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Role Permissions</span>
          </CardTitle>
          <CardDescription>Understanding access levels for different roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Badge variant="destructive">Admin</Badge>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full system access</li>
                <li>• Manage team members</li>
                <li>• Business settings</li>
                <li>• Financial reports</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Badge variant="default">Manager</Badge>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Inventory management</li>
                <li>• Customer management</li>
                <li>• Sales reports</li>
                <li>• Process payments</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Staff</Badge>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View inventory</li>
                <li>• Process sales</li>
                <li>• Basic customer info</li>
                <li>• Limited reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(member.status) as any}>{member.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <Badge variant={getRoleColor(member.role) as any}>{member.role}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Invited:</span>
                  <span className="text-sm">{new Date(member.invitedDate).toLocaleDateString()}</span>
                </div>
                {member.lastActive && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Active:</span>
                    <span className="text-sm">{new Date(member.lastActive).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Role
                  </Button>
                  {member.status === "pending" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Resend Invite
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <InviteUserDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onUserInvited={(user) => {
          setTeamMembers([
            ...teamMembers,
            {
              ...user,
              id: Date.now().toString(),
              status: "pending" as const,
              invitedDate: new Date().toISOString(),
            },
          ])
        }}
      />
    </div>
  )
}
