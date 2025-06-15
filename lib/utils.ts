import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting for Kenyan Shilling
export function formatCurrency(amount: number, currency = "KES"): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

// Phone number utilities
export function formatPhoneNumber(phone: string): string {
  // Format phone number for display
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("254")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

// Business utilities
export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `RCP-${timestamp}-${random}`.toUpperCase()
}

export function calculateTax(amount: number, taxRate = 0.16): number {
  return amount * taxRate
}

export function calculateTotal(subtotal: number, taxRate = 0.16): number {
  return subtotal + calculateTax(subtotal, taxRate)
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateKenyanPhone(phone: string): boolean {
  const phoneRegex = /^(\+254|254|0)?[71]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

export function validateKRAPIN(pin: string): boolean {
  const pinRegex = /^[A-Z]\d{9}[A-Z]$/
  return pinRegex.test(pin)
}

// Stock level utilities
export function getStockStatus(
  current: number,
  threshold: number,
): {
  status: "in-stock" | "low-stock" | "out-of-stock"
  color: string
  message: string
} {
  if (current === 0) {
    return {
      status: "out-of-stock",
      color: "red",
      message: "Out of stock",
    }
  } else if (current <= threshold) {
    return {
      status: "low-stock",
      color: "yellow",
      message: "Low stock",
    }
  } else {
    return {
      status: "in-stock",
      color: "green",
      message: "In stock",
    }
  }
}

// Analytics utilities
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function formatGrowthRate(rate: number): string {
  const sign = rate >= 0 ? "+" : ""
  return `${sign}${rate.toFixed(1)}%`
}

// Local storage utilities
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}
