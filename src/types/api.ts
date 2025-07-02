/**
 * @file: api.ts
 * @description: TypeScript типы для API PizzaNat
 * @dependencies: Базируется на анализе backend API
 * @created: 2025-01-07
 */

// Базовые типы ответов API
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// Аутентификация
export interface AuthUser {
  id: number
  phone: string
  email?: string
  name?: string
  telegram_id?: string
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  phone: string
  password?: string
  sms_code?: string
}

export interface LoginResponse {
  user: AuthUser
  token: string
  expires_at: string
}

// Продукты и меню
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
  category_id: number
  is_available: boolean
  ingredients?: string[]
  nutritional_info?: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  }
}

export interface Category {
  id: number
  name: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
}

// Корзина
export interface CartItem {
  id: number
  product_id: number
  quantity: number
  price: number
  total_price: number
  product: Product
}

export interface Cart {
  id: number
  user_id: number
  items: CartItem[]
  total_amount: number
  created_at: string
  updated_at: string
}

// Заказы
export interface Order {
  id: number
  user_id: number
  status: OrderStatus
  total_amount: number
  delivery_address?: string
  delivery_time?: string
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  total_price: number
  product: Product
}

export const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERING: 'delivering',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export const PaymentMethod = {
  CASH: 'cash',
  CARD: 'card',
  YOOKASSA: 'yookassa'
} as const

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod]

export const PaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus]

// Адреса доставки
export interface DeliveryAddress {
  id: number
  user_id: number
  title: string
  address: string
  latitude?: number
  longitude?: number
  is_default: boolean
  created_at: string
}

// Пагинация
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// Ошибки API
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
} 