/**
 * @file: VKPixel.tsx
 * @description: Компонент для интеграции с VK Пикселем (Top.Mail.Ru) и электронной коммерцией
 * @dependencies: React, VK Pixel API, dataLayer
 * @created: 2025-01-24
 */

import { useEffect } from 'react'

interface VKPixelProps {
  pixelId: string
  enableEcommerce?: boolean
}

// Интерфейсы для электронной коммерции VK согласно документации
// https://ads.vk.com/help/articles/ecomm_web_dynrem

export interface VKEcommerceProduct {
  id: string
  name: string
  category?: string
  brand?: string
  price: number
  quantity?: number
}

interface VKEcommerceGoalParams {
  product_id?: string | string[]
  value?: number
  [key: string]: any
}

// Интерфейс для объекта _tmr
declare global {
  interface Window {
    _tmr: Array<{
      id?: string
      type?: string
      start?: number
      value?: string | number
      goal?: string
      params?: VKEcommerceGoalParams
    }>
  }
}

export function VKPixel({ pixelId, enableEcommerce = true }: VKPixelProps) {
  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') {
      return
    }
    
    // В development режиме показываем предупреждение
    if (import.meta.env.DEV) {
      console.log('🔍 VK Пиксель: Development режим - аналитика отключена')
      return
    }

    // Инициализируем _tmr массив
    window._tmr = window._tmr || []
    
    // Создаем скрипт VK Пикселя (Top.Mail.Ru)
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.id = 'tmr-code'
    script.src = 'https://top-fwz1.mail.ru/js/code.js'
    
    // Отправляем pageView событие
    window._tmr.push({
      id: pixelId,
      type: "pageView",
      start: (new Date()).getTime()
    })
    
    // Функция для вставки скрипта
    const insertScript = () => {
      const existingScript = document.getElementsByTagName('script')[0]
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.insertBefore(script, existingScript)
      }
    }
    
    // Вставляем скрипт в зависимости от браузера
    if ((window as any).opera === "[object Opera]") {
      document.addEventListener("DOMContentLoaded", insertScript, false)
    } else {
      insertScript()
    }

    // Добавляем noscript версию
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `
      <div>
        <img src="https://top-fwz1.mail.ru/counter?id=${pixelId};js=na" 
             style="position:absolute;left:-9999px;" 
             alt="Top.Mail.Ru" />
      </div>
    `
    document.body.appendChild(noscript)

    console.log('🎯 VK Пиксель инициализирован:', pixelId)

    // Cleanup при размонтировании
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.body.contains(noscript)) {
        document.body.removeChild(noscript)
      }
    }
  }, [pixelId, enableEcommerce])

  return null
}

// Хук для отправки событий в VK Пиксель
export const useVKPixel = (pixelId: string) => {
  
  // Базовая отправка цели в VK пиксель
  const reachGoal = (goal: string, params?: VKEcommerceGoalParams) => {
    if (typeof window !== 'undefined' && window._tmr) {
      window._tmr.push({
        type: "reachGoal",
        id: pixelId,
        goal: goal,
        params: params
      })
      console.log('🎯 VK Goal:', goal, params)
    }
  }

  // 1. Просмотр карточки товара (view_item)
  const trackProductView = (product: VKEcommerceProduct) => {
    reachGoal('view_item', {
      product_id: product.id,
      value: product.price,
      content_type: 'product',
      content_name: product.name,
      content_category: product.category || 'Продукция'
    })
  }

  // 2. Добавление в избранное (add_to_wishlist) - опционально
  const trackAddToWishlist = (product: VKEcommerceProduct) => {
    reachGoal('add_to_wishlist', {
      product_id: product.id,
      value: product.price,
      content_name: product.name,
      content_category: product.category || 'Продукция'
    })
  }

  // 3. Добавление в корзину (add_to_cart)
  const trackAddToCart = (product: VKEcommerceProduct) => {
    const value = product.price * (product.quantity || 1)
    
    reachGoal('add_to_cart', {
      product_id: product.id,
      value: value,
      content_name: product.name,
      content_category: product.category || 'Продукция',
      quantity: product.quantity || 1
    })
  }

  // 4. Покупка (purchase)
  const trackPurchase = (products: VKEcommerceProduct[], orderId?: string) => {
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
    const productIds = products.map(p => p.id)
    
    reachGoal('purchase', {
      product_id: productIds,
      value: totalValue,
      order_id: orderId,
      content_ids: productIds,
      num_items: products.length
    })
  }

  // Дополнительные события специфичные для пиццерии

  // Начало оформления заказа
  const trackCheckoutStart = (products: VKEcommerceProduct[]) => {
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
    const productIds = products.map(p => p.id)
    
    reachGoal('initiate_checkout', {
      product_id: productIds,
      value: totalValue,
      num_items: products.length,
      content_ids: productIds
    })
  }

  // Поиск товаров
  const trackSearch = (searchTerm: string) => {
    reachGoal('search', {
      search_string: searchTerm,
      content_type: 'product'
    })
  }

  // Просмотр списка товаров (категории)
  const trackViewItemList = (categoryName: string, products: VKEcommerceProduct[]) => {
    const productIds = products.map(p => p.id)
    
    reachGoal('view_item_list', {
      product_id: productIds,
      content_category: categoryName,
      item_list_name: categoryName,
      num_items: products.length
    })
  }

  // Удаление из корзины
  const trackRemoveFromCart = (product: VKEcommerceProduct) => {
    const value = product.price * (product.quantity || 1)
    
    reachGoal('remove_from_cart', {
      product_id: product.id,
      value: value,
      content_name: product.name,
      content_category: product.category || 'Продукция',
      quantity: product.quantity || 1
    })
  }

  // События для доставки пиццы
  const trackDeliveryZoneSelected = (zone: string, deliveryCost: number) => {
    reachGoal('delivery_zone_selected', {
      delivery_zone: zone,
      delivery_cost: deliveryCost,
      value: deliveryCost
    })
  }

  const trackPaymentMethodSelected = (method: 'cash' | 'card' | 'sbp') => {
    reachGoal('payment_method_selected', {
      payment_method: method,
      payment_type: method === 'cash' ? 'offline' : 'online'
    })
  }

  // Лид-события
  const trackLead = (leadType: string, value?: number) => {
    reachGoal('lead', {
      lead_type: leadType,
      value: value,
      content_type: 'lead'
    })
  }

  return {
    // Основные события электронной коммерции VK
    trackProductView,
    trackAddToWishlist,
    trackAddToCart,
    trackRemoveFromCart,
    trackCheckoutStart,
    trackPurchase,
    
    // Дополнительные события
    trackSearch,
    trackViewItemList,
    trackLead,
    
    // События специфичные для пиццерии
    trackDeliveryZoneSelected,
    trackPaymentMethodSelected,
    
    // Базовые методы
    reachGoal
  }
}

// Компонент-провайдер для инициализации в App.tsx
interface VKPixelProviderProps {
  pixelId: string
  children: React.ReactNode
  enableEcommerce?: boolean
}

export function VKPixelProvider({ 
  pixelId, 
  children, 
  enableEcommerce = true 
}: VKPixelProviderProps) {
  useEffect(() => {
    // Инициализируем _tmr массив для VK пикселя
    if (typeof window !== 'undefined') {
      window._tmr = window._tmr || []
    }
  }, [])

  return (
    <>
      <VKPixel pixelId={pixelId} enableEcommerce={enableEcommerce} />
      {children}
    </>
  )
}

// Утилиты преобразования данных

// Преобразование продукта в формат VK
export function productToVKEcommerce(
  product: any,
  options?: {
    quantity?: number
    variant?: string
  }
): VKEcommerceProduct {
  return {
    id: product.id?.toString() || '',
    name: product.name || '',
    category: product.category?.name || product.categoryName || 'Продукция',
    brand: 'ДИМБО Пицца',
    price: product.price || 0,
    quantity: options?.quantity || 1
  }
}

// Преобразование элемента корзины в формат VK
export function cartItemToVKEcommerce(cartItem: any): VKEcommerceProduct {
  return {
    id: cartItem.productId?.toString() || cartItem.id?.toString() || '',
    name: cartItem.productName || cartItem.name || '',
    category: cartItem.categoryName || 'Продукция',
    brand: 'ДИМБО Пицца',
    price: cartItem.price || 0,
    quantity: cartItem.quantity || 1
  }
}

// Преобразование массива товаров корзины
export function cartItemsToVKEcommerce(cartItems: any[]): VKEcommerceProduct[] {
  return cartItems.map(cartItemToVKEcommerce)
}
