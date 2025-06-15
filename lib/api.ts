// API configuration and utilities for FastAPI backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.access_token) {
      this.setToken(response.access_token)
    }

    return response
  }

  async register(name: string, email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Business profile endpoints
  async getBusinessProfile() {
    return this.request("/business/profile")
  }

  async updateBusinessProfile(data: any) {
    return this.request("/business/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Product endpoints
  async getProducts() {
    return this.request("/products")
  }

  async createProduct(data: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Customer endpoints
  async getCustomers() {
    return this.request("/customers")
  }

  async createCustomer(data: any) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Payment endpoints
  async initiatePayment(data: any) {
    return this.request("/payments/initiate", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getPayments() {
    return this.request("/payments")
  }

  async checkPaymentStatus(transactionId: string) {
    return this.request(`/payments/status/${transactionId}`)
  }

  // Sales endpoints
  async getSalesAnalytics(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : ""
    return this.request(`/sales/analytics${queryString}`)
  }

  async generateInvoice(paymentId: string) {
    return this.request(`/invoices/generate/${paymentId}`, {
      method: "POST",
    })
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// M-Pesa specific utilities
export const mpesaUtils = {
  formatPhoneNumber: (phone: string): string => {
    // Convert phone number to M-Pesa format (254XXXXXXXXX)
    let formatted = phone.replace(/\D/g, "")
    if (formatted.startsWith("0")) {
      formatted = "254" + formatted.slice(1)
    } else if (formatted.startsWith("7") || formatted.startsWith("1")) {
      formatted = "254" + formatted
    }
    return formatted
  },

  validatePhoneNumber: (phone: string): boolean => {
    const formatted = mpesaUtils.formatPhoneNumber(phone)
    return /^254[71]\d{8}$/.test(formatted)
  },
}

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const handleApiError = (error: any) => {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status,
      data: error.data,
    }
  }

  return {
    message: "An unexpected error occurred",
    status: 500,
    data: null,
  }
}
