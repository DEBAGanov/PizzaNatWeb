/**
 * @file: products.ts
 * @description: Типы для продуктов, категорий и меню
 * @dependencies: Базовые типы API
 * @created: 2024-12-19
 */

// Базовые типы для продуктов
export interface Category {
  id: number
  name: string
  description: string
  imageUrl: string
  displayOrder: number
}

export interface ProductImage {
  id: number
  url: string
  alt_text?: string
  is_primary: boolean
  sort_order: number
}

export interface ProductVariant {
  id: number
  name: string
  price: number
  size?: string
  weight?: number
  is_available: boolean
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  discountedPrice?: number
  categoryId: number
  categoryName: string
  imageUrl: string
  weight: number
  discountPercent?: number
  available: boolean
  specialOffer: boolean
}

// Типы для API запросов (адаптированы под реальное API)
export interface ProductsListRequest {
  category?: number
  search?: string
  available?: boolean
  page?: number
  size?: number
  sort?: string
}

export interface ProductsListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface CategoriesListResponse {
  categories: Category[]
  total: number
}

// Типы для корзины (адаптированы под реальное API)
export interface CartItem {
  id: number
  productId: number
  productName: string
  productImageUrl: string
  price: number
  discountedPrice?: number
  quantity: number
  subtotal: number
}

export interface Cart {
  id?: number
  sessionId: string
  totalAmount: number
  items: CartItem[]
}

export interface AddToCartRequest {
  productId: number
  quantity: number
  selectedOptions?: Record<string, any>
  notes?: string
}

export interface UpdateCartItemRequest {
  quantity: number
  notes?: string
}

export interface CartResponse {
  cart: Cart
  message: string
}

// Типы для избранного
export interface FavoriteProduct {
  id: number
  user_id: number
  product_id: number
  product: Product
  created_at: string
}

export interface FavoritesResponse {
  favorites: FavoriteProduct[]
  total: number
}

// Типы для поиска
export interface SearchSuggestion {
  id: number
  text: string
  type: 'product' | 'category'
  category_id?: number
}

export interface SearchResponse {
  products: Product[]
  suggestions: SearchSuggestion[]
  total: number
  search_query: string
}

// Типы для фильтров
export interface PriceRange {
  min: number
  max: number
}

export interface ProductFilters {
  categories: number[]
  price_range?: PriceRange
  is_available?: boolean
  is_popular?: boolean
  is_new?: boolean
  allergens_exclude?: string[]
  cooking_time_max?: number
}

// Утилитарные типы
export type ProductSortOption = {
  value: string
  label: string
}

export type ProductDisplayMode = 'grid' | 'list'

// Константы для продуктов
export const PRODUCT_SORT_OPTIONS = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'name', label: 'По названию' },
  { value: 'price_asc', label: 'По цене (возрастание)' },
  { value: 'price_desc', label: 'По цене (убывание)' },
  { value: 'newest', label: 'Новинки' }
]

export const DEFAULT_PRODUCTS_LIMIT = 20
export const DEFAULT_SEARCH_LIMIT = 10

// Типы для доставки
export interface AddressSuggestion {
  value: string
  label: string
  district?: string
  city?: string
  fullAddress?: string
}

export interface DeliveryEstimate {
  deliveryCost: number
  isDeliveryFree: boolean
  deliveryAvailable: boolean
  zoneName: string
  city?: string
  estimatedTime?: string
  description?: string
  baseCost?: number
  freeDeliveryThreshold?: number
}

export interface DeliveryZone {
  id: number
  name: string
  deliveryCost: number
  freeDeliveryThreshold: number
  estimatedTime: string
}

// Типы для заказов
export interface OrderItem {
  id: number
  productId: number
  productName: string
  productImageUrl: string
  quantity: number
  price: number
  subtotal: number
}

export interface Order {
  id: number
  status: string
  statusDescription: string
  deliveryLocationId?: number
  deliveryLocationName?: string
  deliveryLocationAddress?: string
  deliveryAddress?: string
  totalAmount: number
  deliveryCost: number
  deliveryType: string
  comment?: string
  contactName: string
  contactPhone: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  pickup: boolean
  deliveryByCourier: boolean
  itemsAmount: number
}

export interface OrdersResponse {
  content: Order[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    unpaged: boolean
    paged: boolean
  }
  totalElements: number
  totalPages: number
  last: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface CreateOrderRequest {
  deliveryLocationId?: number
  deliveryAddress?: string
  contactName: string
  contactPhone: string
  comment?: string
  notes?: string
  paymentMethod?: 'cash' | 'sbp'
}

export interface PaymentUrlResponse {
  url: string
} 