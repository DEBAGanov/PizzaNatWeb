/**
 * @file: ecommerceHelpers.ts
 * @description: Утилиты для преобразования данных приложения в формат электронной торговли Яндекс Метрики
 * @dependencies: types/products.ts
 * @created: 2025-01-27
 */

import type { Product, CartItem } from '../types/products'
import type { EcommerceProduct } from '../components/analytics/YandexMetrika'

// Реэкспортируем интерфейс для удобства
export type { EcommerceProduct }

/**
 * Преобразует товар приложения в формат электронной торговли
 */
export function productToEcommerce(
  product: Product, 
  options?: {
    quantity?: number
    position?: number
    list?: string
    variant?: string
  }
): EcommerceProduct {
  return {
    id: product.id.toString(),
    name: product.name,
    category: product.category?.name || "Продукция",
    brand: "ДИМБО Пицца",
    variant: options?.variant || (product.description ? `${product.description.substring(0, 50)}...` : undefined),
    price: product.price,
    quantity: options?.quantity || 1,
    position: options?.position || 1,
    list: options?.list || "Каталог продукции"
  }
}

/**
 * Преобразует элемент корзины в формат электронной торговли
 */
export function cartItemToEcommerce(
  cartItem: CartItem,
  options?: {
    position?: number
    list?: string
  }
): EcommerceProduct {
  return {
    id: cartItem.productId.toString(),
    name: cartItem.productName,
    category: cartItem.categoryName || "Продукция",
    brand: "ДИМБО Пицца",
    variant: cartItem.selectedOptions ? JSON.stringify(cartItem.selectedOptions) : undefined,
    price: cartItem.price,
    quantity: cartItem.quantity,
    position: options?.position || 1,
    list: options?.list || "Корзина"
  }
}

/**
 * Преобразует массив элементов корзины в формат электронной торговли
 */
export function cartItemsToEcommerce(
  cartItems: CartItem[],
  options?: {
    list?: string
  }
): EcommerceProduct[] {
  return cartItems.map((item, index) => 
    cartItemToEcommerce(item, {
      position: index + 1,
      list: options?.list || "Корзина"
    })
  )
}

/**
 * Определяет категорию товара для аналитики
 */
export function getCategoryForAnalytics(categoryName?: string): string {
  if (!categoryName) return "Продукция"
  
  const categoryMap: Record<string, string> = {
    "Пиццы": "Пицца",
    "Бургеры": "Бургер", 
    "Закуски": "Закуска",
    "Напитки": "Напиток",
    "Десерты": "Десерт",
    "Суши": "Суши",
    "Роллы": "Ролл"
  }
  
  return categoryMap[categoryName] || categoryName
}

/**
 * Получает список для отслеживания на основе текущей страницы
 */
export function getListForTracking(pathname: string): string {
  if (pathname.includes('/menu')) {
    if (pathname.includes('category=')) {
      const urlParams = new URLSearchParams(pathname.split('?')[1])
      const category = urlParams.get('category')
      return category ? `Категория: ${category}` : "Меню"
    }
    return "Меню"
  }
  
  if (pathname.includes('/cart')) return "Корзина"
  if (pathname.includes('/checkout')) return "Оформление заказа"
  if (pathname.includes('/product/')) return "Карточка товара"
  if (pathname === '/') return "Главная страница"
  
  return "Каталог продукции"
}

/**
 * Создает данные для отслеживания поиска товаров
 */
export function createSearchTrackingData(query: string, resultsCount: number) {
  return {
    search_term: query,
    results_count: resultsCount,
    timestamp: new Date().toISOString()
  }
}

/**
 * Создает данные для отслеживания фильтрации
 */
export function createFilterTrackingData(filters: Record<string, any>) {
  return {
    filter_type: Object.keys(filters).join(','),
    filter_values: JSON.stringify(filters),
    timestamp: new Date().toISOString()
  }
}
