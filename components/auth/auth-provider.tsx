"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  businessId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token and validate
    const token = localStorage.getItem("token")
    if (token) {
      // In a real app, validate token with backend
      // For now, simulate user data
      setUser({
        id: "1",
        email: "user@example.com",
        name: "John Doe",
        businessId: "business-1",
      })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call to FastAPI backend
    try {
      // const response = await fetch('/api/auth/login', { ... })
      const mockUser = {
        id: "1",
        email,
        name: "John Doe",
        businessId: "business-1",
      }
      localStorage.setItem("token", "mock-jwt-token")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call to FastAPI backend
    try {
      // const response = await fetch('/api/auth/register', { ... })
      const mockUser = {
        id: "1",
        email,
        name,
        businessId: "business-1",
      }
      localStorage.setItem("token", "mock-jwt-token")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
