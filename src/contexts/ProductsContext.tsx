/**
 * @file: ProductsContext.tsx
 * @description: Контекст для управления состоянием продуктов, категорий и корзины
 * @dependencies: React, productsApi, типы продуктов
 * @created: 2024-12-19
 */

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import { notifications } from '@mantine/notifications'
import { productsApi } from '../services/productsApi'
import type {
  Category,
  Product,
  Cart,
  ProductsListRequest,
  ProductsListResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  ProductFilters
} from '../types/products'

// Типы состояния
interface ProductsState {
  // Категории
  categories: Category[]
  categoriesLoading: boolean
  categoriesError: string | null

  // Продукты
  products: Product[]
  productsLoading: boolean
  productsError: string | null
  productsTotal: number
  productsPage: number
  productsLimit: number

  // Текущий продукт
  currentProduct: Product | null
  currentProductLoading: boolean
  currentProductError: string | null

  // Корзина
  cart: Cart | null
  cartLoading: boolean
  cartError: string | null

  // Поиск и фильтры
  searchQuery: string
  filters: ProductFilters
  isSearching: boolean

  // Избранное
  favorites: number[]
  favoritesLoading: boolean
}

// Типы действий
type ProductsAction =
  // Категории
  | { type: 'SET_CATEGORIES_LOADING'; payload: boolean }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_CATEGORIES_ERROR'; payload: string | null }
  
  // Продукты
  | { type: 'SET_PRODUCTS_LOADING'; payload: boolean }
  | { type: 'SET_PRODUCTS'; payload: ProductsListResponse }
  | { type: 'APPEND_PRODUCTS'; payload: Product[] }
  | { type: 'SET_PRODUCTS_ERROR'; payload: string | null }
  
  // Текущий продукт
  | { type: 'SET_CURRENT_PRODUCT_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PRODUCT'; payload: Product | null }
  | { type: 'SET_CURRENT_PRODUCT_ERROR'; payload: string | null }
  
  // Корзина
  | { type: 'SET_CART_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart | null }
  | { type: 'SET_CART_ERROR'; payload: string | null }
  
  // Поиск и фильтры
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<ProductFilters> }
  | { type: 'SET_IS_SEARCHING'; payload: boolean }
  
  // Избранное
  | { type: 'SET_FAVORITES_LOADING'; payload: boolean }
  | { type: 'SET_FAVORITES'; payload: number[] }
  | { type: 'TOGGLE_FAVORITE'; payload: number }

// Начальное состояние
const initialState: ProductsState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  products: [],
  productsLoading: false,
  productsError: null,
  productsTotal: 0,
  productsPage: 1,
  productsLimit: 20,

  currentProduct: null,
  currentProductLoading: false,
  currentProductError: null,

  cart: null,
  cartLoading: false,
  cartError: null,

  searchQuery: '',
  filters: {
    categories: [],
    is_available: true
  },
  isSearching: false,

  favorites: [],
  favoritesLoading: false
}

// Редьюсер
function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    // Категории
    case 'SET_CATEGORIES_LOADING':
      return { ...state, categoriesLoading: action.payload }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, categoriesLoading: false, categoriesError: null }
    case 'SET_CATEGORIES_ERROR':
      return { ...state, categoriesError: action.payload, categoriesLoading: false }

    // Продукты
    case 'SET_PRODUCTS_LOADING':
      return { ...state, productsLoading: action.payload }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        productsTotal: action.payload.total,
        productsPage: action.payload.page,
        productsLimit: action.payload.limit,
        productsLoading: false,
        productsError: null
      }
    case 'APPEND_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload],
        productsLoading: false
      }
    case 'SET_PRODUCTS_ERROR':
      return { ...state, productsError: action.payload, productsLoading: false }

    // Текущий продукт
    case 'SET_CURRENT_PRODUCT_LOADING':
      return { ...state, currentProductLoading: action.payload }
    case 'SET_CURRENT_PRODUCT':
      return { ...state, currentProduct: action.payload, currentProductLoading: false, currentProductError: null }
    case 'SET_CURRENT_PRODUCT_ERROR':
      return { ...state, currentProductError: action.payload, currentProductLoading: false }

    // Корзина
    case 'SET_CART_LOADING':
      return { ...state, cartLoading: action.payload }
    case 'SET_CART':
      return { ...state, cart: action.payload, cartLoading: false, cartError: null }
    case 'SET_CART_ERROR':
      return { ...state, cartError: action.payload, cartLoading: false }

    // Поиск и фильтры
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_IS_SEARCHING':
      return { ...state, isSearching: action.payload }

    // Избранное
    case 'SET_FAVORITES_LOADING':
      return { ...state, favoritesLoading: action.payload }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload, favoritesLoading: false }
    case 'TOGGLE_FAVORITE':
      const productId = action.payload
      const isFavorite = state.favorites.includes(productId)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      }

    default:
      return state
  }
}

// Контекст
interface ProductsContextType {
  state: ProductsState
  
  // Категории
  loadCategories: () => Promise<void>
  
  // Продукты
  loadProducts: (params?: ProductsListRequest) => Promise<void>
  loadMoreProducts: () => Promise<void>
  loadProduct: (id: number) => Promise<void>
  searchProducts: (query: string) => Promise<void>
  
  // Корзина
  loadCart: () => Promise<void>
  addToCart: (item: AddToCartRequest) => Promise<void>
  updateCartItem: (itemId: number, updates: UpdateCartItemRequest) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
  
  // Фильтры
  setFilters: (filters: Partial<ProductFilters>) => void
  clearFilters: () => void
  
  // Избранное
  loadFavorites: () => Promise<void>
  toggleFavorite: (productId: number) => Promise<void>
  
  // Утилиты
  getCartItemsCount: () => number
  getCartTotal: () => number
  isFavorite: (productId: number) => boolean
}

const ProductsContext = createContext<ProductsContextType | null>(null)

// Провайдер
interface ProductsProviderProps {
  children: ReactNode
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  // Загрузка категорий
  const loadCategories = useCallback(async () => {
    try {
      dispatch({ type: 'SET_CATEGORIES_LOADING', payload: true })
      const response = await productsApi.getCategories()
      dispatch({ type: 'SET_CATEGORIES', payload: response.categories })
    } catch (error: any) {
      dispatch({ type: 'SET_CATEGORIES_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось загрузить категории',
        color: 'red'
      })
    }
  }, [])

  // Загрузка продуктов
  const loadProducts = useCallback(async (params: ProductsListRequest = {}) => {
    try {
      dispatch({ type: 'SET_PRODUCTS_LOADING', payload: true })
      const response = await productsApi.getProducts(params)
      dispatch({ type: 'SET_PRODUCTS', payload: response })
    } catch (error: any) {
      dispatch({ type: 'SET_PRODUCTS_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось загрузить продукты',
        color: 'red'
      })
    }
  }, [])

  // Загрузка дополнительных продуктов (пагинация)
  const loadMoreProducts = async () => {
    if (state.productsLoading) return

    try {
      dispatch({ type: 'SET_PRODUCTS_LOADING', payload: true })
      const nextPage = state.productsPage + 1
      const response = await productsApi.getProducts({
        page: nextPage,
        limit: state.productsLimit,
        search: state.searchQuery || undefined,
        ...state.filters
      })
      dispatch({ type: 'APPEND_PRODUCTS', payload: response.products })
    } catch (error: any) {
      dispatch({ type: 'SET_PRODUCTS_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось загрузить дополнительные продукты',
        color: 'red'
      })
    }
  }

  // Загрузка конкретного продукта
  const loadProduct = async (id: number) => {
    try {
      dispatch({ type: 'SET_CURRENT_PRODUCT_LOADING', payload: true })
      const product = await productsApi.getProductById(id)
      dispatch({ type: 'SET_CURRENT_PRODUCT', payload: product })
    } catch (error: any) {
      dispatch({ type: 'SET_CURRENT_PRODUCT_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось загрузить продукт',
        color: 'red'
      })
    }
  }

  // Поиск продуктов
  const searchProducts = async (query: string) => {
    try {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
      dispatch({ type: 'SET_IS_SEARCHING', payload: true })
      
      const response = await productsApi.searchProducts(query)
      dispatch({ type: 'SET_PRODUCTS', payload: {
        products: response.products,
        total: response.total,
        page: 1,
        limit: state.productsLimit,
        total_pages: Math.ceil(response.total / state.productsLimit)
      }})
    } catch (error: any) {
      dispatch({ type: 'SET_PRODUCTS_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось выполнить поиск',
        color: 'red'
      })
    } finally {
      dispatch({ type: 'SET_IS_SEARCHING', payload: false })
    }
  }

  // Загрузка корзины
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true })
      const cart = await productsApi.getCart()
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error: any) {
      dispatch({ type: 'SET_CART_ERROR', payload: error.message })
      // Для корзины не показываем уведомление об ошибке, если пользователь не авторизован
      if (error.code !== 'UNAUTHORIZED') {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить корзину',
          color: 'red'
        })
      }
    }
  }

  // Добавление в корзину
  const addToCart = useCallback(async (item: AddToCartRequest) => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true })
      const cart = await productsApi.addToCart(item)
      dispatch({ type: 'SET_CART', payload: cart })
      notifications.show({
        title: 'Успешно',
        message: 'Товар добавлен в корзину',
        color: 'green'
      })
    } catch (error: any) {
      dispatch({ type: 'SET_CART_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось добавить товар в корзину',
        color: 'red'
      })
    }
  }, [])

  // Обновление товара в корзине
  const updateCartItem = async (itemId: number, updates: UpdateCartItemRequest) => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true })
      const cart = await productsApi.updateCartItem(itemId, updates)
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error: any) {
      dispatch({ type: 'SET_CART_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить товар в корзине',
        color: 'red'
      })
    }
  }

  // Удаление из корзины
  const removeFromCart = async (itemId: number) => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true })
      const cart = await productsApi.removeFromCart(itemId)
      dispatch({ type: 'SET_CART', payload: cart })
      notifications.show({
        title: 'Успешно',
        message: 'Товар удален из корзины',
        color: 'orange'
      })
    } catch (error: any) {
      dispatch({ type: 'SET_CART_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось удалить товар из корзины',
        color: 'red'
      })
    }
  }

  // Очистка корзины
  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_CART_LOADING', payload: true })
      await productsApi.clearCart()
      dispatch({ type: 'SET_CART', payload: null })
      notifications.show({
        title: 'Успешно',
        message: 'Корзина очищена',
        color: 'orange'
      })
    } catch (error: any) {
      dispatch({ type: 'SET_CART_ERROR', payload: error.message })
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось очистить корзину',
        color: 'red'
      })
    }
  }

  // Установка фильтров
  const setFilters = (filters: Partial<ProductFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  // Очистка фильтров
  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: { categories: [], is_available: true } })
  }

  // Загрузка избранного
  const loadFavorites = async () => {
    try {
      dispatch({ type: 'SET_FAVORITES_LOADING', payload: true })
      const response = await productsApi.getFavorites()
      const favoriteIds = response.favorites.map(fav => fav.product_id)
      dispatch({ type: 'SET_FAVORITES', payload: favoriteIds })
    } catch (error: any) {
      // Не показываем ошибку для неавторизованных пользователей
      if (error.code !== 'UNAUTHORIZED') {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить избранное',
          color: 'red'
        })
      }
    }
  }

  // Переключение избранного
  const toggleFavorite = async (productId: number) => {
    try {
      const isAdded = await productsApi.toggleFavorite(productId)
      dispatch({ type: 'TOGGLE_FAVORITE', payload: productId })
      
      notifications.show({
        title: isAdded ? 'Добавлено в избранное' : 'Удалено из избранного',
        message: isAdded ? '❤️ Товар добавлен в избранное' : '💔 Товар удален из избранного',
        color: isAdded ? 'pink' : 'gray'
      })
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить избранное',
        color: 'red'
      })
    }
  }

  // Утилитарные функции
  const getCartItemsCount = (): number => {
    return state.cart?.total_items ?? 0
  }

  const getCartTotal = (): number => {
    return state.cart?.total_price ?? 0
  }

  const isFavorite = (productId: number): boolean => {
    return state.favorites.includes(productId)
  }

  // Загрузка начальных данных
  useEffect(() => {
    loadCategories()
    // Корзина и избранное загружаются только для авторизованных пользователей
    // и будут загружены через AuthContext при входе в систему
  }, [])

  const contextValue: ProductsContextType = {
    state,
    loadCategories,
    loadProducts,
    loadMoreProducts,
    loadProduct,
    searchProducts,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    setFilters,
    clearFilters,
    loadFavorites,
    toggleFavorite,
    getCartItemsCount,
    getCartTotal,
    isFavorite
  }

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  )
}

// Хук для использования контекста
export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export default ProductsContext 