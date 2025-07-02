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
  description?: string
  image?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
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
  short_description?: string
  category_id: number
  category: Category
  images: ProductImage[]
  variants: ProductVariant[]
  base_price: number
  is_available: boolean
  is_popular: boolean
  is_new: boolean
  ingredients?: string[]
  allergens?: string[]
  nutritional_info?: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  }
  cooking_time?: number
  weight?: number
  created_at: string
  updated_at: string
}

// Типы для API запросов
export interface ProductsListRequest {
  category_id?: number
  search?: string
  is_available?: boolean
  is_popular?: boolean
  is_new?: boolean
  page?: number
  limit?: number
  sort_by?: 'name' | 'price' | 'created_at' | 'popularity'
  sort_order?: 'asc' | 'desc'
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

// Типы для корзины
export interface CartItem {
  id?: number
  product_id: number
  product: Product
  variant_id?: number
  variant?: ProductVariant
  quantity: number
  price: number
  total_price: number
  notes?: string
}

export interface Cart {
  id?: number
  user_id?: number
  session_id?: string
  items: CartItem[]
  total_items: number
  total_price: number
  created_at?: string
  updated_at?: string
}

export interface AddToCartRequest {
  product_id: number
  variant_id?: number
  quantity: number
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
  value: ProductsListRequest['sort_by']
  label: string
  order: ProductsListRequest['sort_order']
}

export type ProductDisplayMode = 'grid' | 'list'

// Константы для продуктов
export const PRODUCT_SORT_OPTIONS: ProductSortOption[] = [
  { value: 'popularity', label: 'По популярности', order: 'desc' },
  { value: 'name', label: 'По названию', order: 'asc' },
  { value: 'price', label: 'По цене (возрастание)', order: 'asc' },
  { value: 'price', label: 'По цене (убывание)', order: 'desc' },
  { value: 'created_at', label: 'Новинки', order: 'desc' }
]

export const DEFAULT_PRODUCTS_LIMIT = 20
export const DEFAULT_SEARCH_LIMIT = 10 