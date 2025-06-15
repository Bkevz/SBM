"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, CheckCircle, Info, X } from "lucide-react"
import { formatDateTime } from "@/lib/utils"

interface Notification {
  id: string
  type: "low_stock" | "payment" | "system" | "role_invite"
  title: string
  message: string
  date: string
  read: boolean
  priority: "high" | "medium" | "low"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "low_stock",
    title: "Low Stock Alert",
    message: "Cooking Oil 1L is running low (8 units remaining)",
    date: "2024-01-15T10:30:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "M-Pesa payment of KSh 1,999 received from John Kamau",
    date: "2024-01-15T09:15:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    message: "New features available: Enhanced analytics dashboard",
    date: "2024-01-14T16:00:00Z",
    read: true,
    priority: "low",
  },
  {
    id: "4",
    type: "role_invite",
    title: "Team Invitation",
    message: "Mary Wanjiku has been invited as Store Manager",
    date: "2024-01-14T14:30:00Z",
    read: true,
    priority: "medium",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const getIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "payment":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "role_invite":
        return <Info className="h-4 w-4 text-accent" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Stay updated with your business activities</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
          >
            Mark All Read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  !notification.read ? "bg-accent/10 border-accent/30" : "bg-muted/50"
                }`}
              >
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                        {notification.priority}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDateTime(notification.date)}</p>
                  {!notification.read && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
