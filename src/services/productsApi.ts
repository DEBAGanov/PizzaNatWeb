/**
 * @file: productsApi.ts
 * @description: API сервис для работы с продуктами, категориями и корзиной
 * @dependencies: api.ts, types/products.ts
 * @created: 2024-12-19
 */

import { BaseApiService } from './api'
import { API_ENDPOINTS } from '../config/api'
import type {
  Category,
  Product,
  ProductsListRequest,
  ProductsListResponse,
  CategoriesListResponse,
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  CartResponse,
  FavoritesResponse,
  SearchResponse,
  SearchSuggestion,
  Order,
  OrdersResponse,
  CreateOrderRequest,
  PaymentUrlResponse
} from '../types/products'

export class ProductsApi extends BaseApiService {
  constructor() {
    super()
  }

  // Категории
  async getCategories(): Promise<CategoriesListResponse> {
    const apiResponse = await this.get<Category[]>(API_ENDPOINTS.CATEGORIES.LIST)
    return {
      categories: apiResponse,
      total: apiResponse.length
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.get<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id))
  }

  // Продукты
  async getProducts(params: ProductsListRequest = {}): Promise<ProductsListResponse> {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })

    const queryString = searchParams.toString()
    const url = queryString 
      ? `${API_ENDPOINTS.PRODUCTS.LIST}?${queryString}` 
      : API_ENDPOINTS.PRODUCTS.LIST
    
    // Получаем ответ от API
    const apiResponse = await this.get<any>(url)
    
    // Адаптируем структуру ответа к нашему интерфейсу
    // API возвращает: { content: Product[], totalElements: number, totalPages: number, pageable: {...} }
    const adaptedResponse: ProductsListResponse = {
      products: apiResponse.content || [],
      total: apiResponse.totalElements || 0,
      page: apiResponse.pageable?.pageNumber ? apiResponse.pageable.pageNumber + 1 : 1, // API использует 0-based индексацию
      limit: apiResponse.pageable?.pageSize || params.size || 20,
      total_pages: apiResponse.totalPages || 0
    }
    
    return adaptedResponse
  }

  async getProductById(id: number): Promise<Product> {
    return this.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id))
  }

  // Алиас для совместимости
  async getProduct(id: number): Promise<Product> {
    return this.getProductById(id)
  }

  async getPopularProducts(size: number = 10): Promise<Product[]> {
    const response = await this.getProducts({ 
      size,
      page: 0
    })
    return response.products
  }

  async getNewProducts(size: number = 10): Promise<Product[]> {
    const response = await this.getProducts({ 
      size,
      page: 0
    })
    return response.products
  }

  async getProductsByCategory(categoryId: number, params: Omit<ProductsListRequest, 'category'> = {}): Promise<ProductsListResponse> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    const url = queryString
      ? `${API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId)}?${queryString}`
      : API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId)
      
    const apiResponse = await this.get<any>(url)
    const adaptedResponse: ProductsListResponse = {
      products: apiResponse.content || [],
      total: apiResponse.totalElements || 0,
      page: apiResponse.pageable?.pageNumber ? apiResponse.pageable.pageNumber + 1 : 1,
      limit: apiResponse.pageable?.pageSize || params.size || 20,
      total_pages: apiResponse.totalPages || 0
    }
    return adaptedResponse
  }

  // Поиск
  async searchProducts(query: string, size: number = 20): Promise<SearchResponse> {
    const response = await this.getProducts({ 
      search: query, 
      size,
      page: 0
    })
    
    return {
      products: response.products,
      suggestions: [], // Заглушка, может быть реализовано отдельным эндпоинтом
      total: response.total,
      search_query: query
    }
  }

  async getSearchSuggestions(query: string, limit: number = 5): Promise<SearchSuggestion[]> {
    try {
      // Пытаемся использовать специальный эндпоинт для подсказок
      return this.get<SearchSuggestion[]>(`${API_ENDPOINTS.PRODUCTS.SEARCH}/suggestions`, {
        q: query,
        limit
      })
    } catch (error) {
      // Если эндпоинт не существует, возвращаем пустой массив
      console.warn('Search suggestions endpoint not available:', error)
      return []
    }
  }

  // Корзина (обновлено под реальное API)
  async getCart(): Promise<Cart> {
    try {
      // API возвращает корзину напрямую, не в wrapper'е
      const response = await this.get<Cart>(API_ENDPOINTS.CART.GET)
      return response
    } catch (error: any) {
      // Если корзина не найдена, возвращаем пустую корзину
      if (error.status === 404) {
        return {
          id: null,
          sessionId: 'empty-cart-session',
          totalAmount: 0,
          items: []
        }
      }
      throw error
    }
  }

  async addToCart(item: AddToCartRequest): Promise<Cart> {
    // API принимает: {"productId": 1, "quantity": 2, "selectedOptions": {...}}
    const apiPayload = {
      productId: item.productId,
      quantity: item.quantity,
      selectedOptions: item.selectedOptions,
      notes: item.notes
    }
    
    const response = await this.post<Cart>(API_ENDPOINTS.CART.ADD, apiPayload)
    return response
  }

  async updateCartItem(itemId: number, updates: UpdateCartItemRequest): Promise<Cart> {
    console.log('🔧 API updateCartItem:', { itemId, updates, endpoint: API_ENDPOINTS.CART.UPDATE(itemId) })
    const response = await this.put<Cart>(API_ENDPOINTS.CART.UPDATE(itemId), updates)
    console.log('✅ API updateCartItem response:', response)
    return response
  }

  async removeFromCart(itemId: number): Promise<Cart> {
    const response = await this.delete<Cart>(API_ENDPOINTS.CART.REMOVE(itemId))
    return response
  }

  async clearCart(): Promise<void> {
    await this.delete(API_ENDPOINTS.CART.CLEAR)
  }

  // Избранное
  async getFavorites(): Promise<FavoritesResponse> {
    return this.get<FavoritesResponse>(API_ENDPOINTS.FAVORITES.LIST)
  }

  async addToFavorites(productId: number): Promise<void> {
    await this.post(API_ENDPOINTS.FAVORITES.ADD, { product_id: productId })
  }

  async removeFromFavorites(productId: number): Promise<void> {
    await this.delete(API_ENDPOINTS.FAVORITES.REMOVE(productId))
  }

  async toggleFavorite(productId: number): Promise<boolean> {
    try {
      await this.addToFavorites(productId)
      return true
    } catch (error: any) {
      if (error.status === 409 || error.status === 400) {
        // Уже в избранном, удаляем
        await this.removeFromFavorites(productId)
        return false
      }
      throw error
    }
  }

  // Дополнительные методы для работы с продуктами
  async getProductReviews(productId: number, page: number = 1, limit: number = 10) {
    try {
      return this.get(`${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/reviews`, {
        page,
        limit
      })
    } catch (error) {
      console.warn('Product reviews endpoint not available:', error)
      return { reviews: [], total: 0, page, limit }
    }
  }

  async addProductReview(productId: number, review: { rating: number; comment?: string }) {
    try {
      return this.post(`${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/reviews`, review)
    } catch (error) {
      console.warn('Add product review endpoint not available:', error)
      throw error
    }
  }

  // Утилитарные методы
  getProductPrice(product: Product, variantId?: number): number {
    if (variantId && product.variants) {
      const variant = product.variants.find(v => v.id === variantId)
      return variant?.price ?? product.base_price
    }
    return product.base_price
  }

  isProductAvailable(product: Product, variantId?: number): boolean {
    if (!product.is_available) {
      return false
    }
    
    if (variantId && product.variants) {
      const variant = product.variants.find(v => v.id === variantId)
      return variant?.is_available ?? false
    }
    
    return true
  }

  // Методы для работы с изображениями
  getPrimaryImage(product: Product): string | null {
    if (!product.images || product.images.length === 0) {
      return null
    }
    
    const primaryImage = product.images.find(img => img.is_primary)
    return primaryImage?.url ?? product.images[0]?.url ?? null
  }

  getAllImages(product: Product): string[] {
    if (!product.images) {
      return []
    }
    
    return product.images
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map(img => img.url)
  }

  // Методы для форматирования
  formatPrice(price: number): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  formatWeight(weight: number): string {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} кг`
    }
    return `${weight} г`
  }

  formatCookingTime(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 
        ? `${hours} ч ${remainingMinutes} мин`
        : `${hours} ч`
    }
    return `${minutes} мин`
  }

  // Методы для работы с вариантами продуктов
  getProductVariants(product: Product) {
    return product.variants || []
  }

  getVariantById(product: Product, variantId: number) {
    return product.variants?.find(v => v.id === variantId) || null
  }

  // Методы для фильтрации и сортировки
  async getFilteredProducts(filters: {
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    isAvailable?: boolean
    isPopular?: boolean
    isNew?: boolean
    sortBy?: 'price' | 'name' | 'popularity' | 'created_at'
    sortOrder?: 'asc' | 'desc'
    page?: number
    limit?: number
  }): Promise<ProductsListResponse> {
    const params: ProductsListRequest = {}
    
    if (filters.categoryId) params.category_id = filters.categoryId
    if (filters.isAvailable !== undefined) params.is_available = filters.isAvailable
    if (filters.isPopular !== undefined) params.is_popular = filters.isPopular
    if (filters.isNew !== undefined) params.is_new = filters.isNew
    if (filters.sortBy) params.sort_by = filters.sortBy
    if (filters.sortOrder) params.sort_order = filters.sortOrder
    if (filters.page) params.page = filters.page
    if (filters.limit) params.limit = filters.limit

    return this.getProducts(params)
  }

  // Методы для работы с корзиной (дополнительные)
  async getCartItemsCount(): Promise<number> {
    try {
      const cart = await this.getCart()
      return cart.items.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
      console.warn('Failed to get cart items count:', error)
      return 0
    }
  }

  async getCartTotal(): Promise<number> {
    try {
      const cart = await this.getCart()
      return cart.total_price
    } catch (error) {
      console.warn('Failed to get cart total:', error)
      return 0
    }
  }

  // Методы для валидации
  validateProduct(product: Partial<Product>): string[] {
    const errors: string[] = []
    
    if (!product.name || product.name.trim().length === 0) {
      errors.push('Название продукта обязательно')
    }
    
    if (!product.base_price || product.base_price <= 0) {
      errors.push('Цена должна быть больше 0')
    }
    
    if (!product.category_id) {
      errors.push('Категория обязательна')
    }
    
    return errors
  }

  validateCartItem(item: Partial<AddToCartRequest>): string[] {
    const errors: string[] = []
    
    if (!item.product_id) {
      errors.push('ID продукта обязателен')
    }
    
    if (!item.quantity || item.quantity <= 0) {
      errors.push('Количество должно быть больше 0')
    }
    
    return errors
  }



  // Доставка (новая функциональность)
  async estimateDelivery(address: string, orderAmount: number): Promise<any> {
    const params = new URLSearchParams({
      address,
      orderAmount: orderAmount.toString()
    })
    return this.get(`${API_ENDPOINTS.DELIVERY.ESTIMATE}?${params}`)
  }

  async validateAddress(address: string): Promise<any> {
    const params = new URLSearchParams({ address })
    return this.get(`${API_ENDPOINTS.DELIVERY.VALIDATE_ADDRESS}?${params}`)
  }

  async getAddressSuggestions(query: string, limit: number = 5): Promise<any[]> {
    const params = new URLSearchParams({ 
      query,
      limit: limit.toString()
    })
    return this.get(`${API_ENDPOINTS.DELIVERY.ADDRESS_SUGGESTIONS}?${params}`)
  }

  async getDeliveryLocations(): Promise<any[]> {
    return this.get(API_ENDPOINTS.DELIVERY.LOCATIONS)
  }

  // Платежи ЮКасса (новая функциональность)
  async createPayment(paymentData: {
    orderId: number
    method: 'BANK_CARD' | 'SBP'
    description: string
    bankId?: string
  }): Promise<any> {
    return this.post(API_ENDPOINTS.PAYMENTS.YOOKASSA_CREATE, paymentData)
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    return this.get(API_ENDPOINTS.PAYMENTS.YOOKASSA_STATUS(paymentId))
  }

  async getOrderPayments(orderId: number): Promise<any[]> {
    return this.get(API_ENDPOINTS.PAYMENTS.ORDER_PAYMENTS(orderId))
  }

  async getOrderPaymentUrl(orderId: number): Promise<{ paymentUrl: string }> {
    return this.get(API_ENDPOINTS.PAYMENTS.ORDER_PAYMENT_URL(orderId))
  }

  async getSbpBanks(): Promise<any[]> {
    return this.get(API_ENDPOINTS.PAYMENTS.SBP_BANKS)
  }

  // Заказы
  async getOrders(): Promise<OrdersResponse> {
    return this.get<OrdersResponse>(API_ENDPOINTS.ORDERS.LIST)
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return this.post<Order>(API_ENDPOINTS.ORDERS.CREATE, orderData)
  }

  async getOrderById(orderId: number): Promise<Order> {
    return this.get<Order>(API_ENDPOINTS.ORDERS.DETAIL(orderId))
  }

  async getPaymentUrl(orderId: number): Promise<PaymentUrlResponse> {
    return this.get<PaymentUrlResponse>(API_ENDPOINTS.ORDERS.PAYMENT_URL(orderId))
  }
}

// Экспорт синглтона
export const productsApi = new ProductsApi() 