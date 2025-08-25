/**
 * @file: YandexMetrika.tsx
 * @description: Компонент для интеграции с Яндекс.Метрикой
 * @dependencies: React, Яндекс.Метрика
 * @created: 2025-01-24
 */

import { useEffect } from 'react'

interface YandexMetrikaProps {
  counterId: string
  webvisor?: boolean
  clickmap?: boolean
  trackLinks?: boolean
  accurateTrackBounce?: boolean
}

// Интерфейсы для электронной коммерции согласно официальной документации Яндекса

// Интерфейс товара для электронной торговли
export interface EcommerceProduct {
  id: string
  name: string
  category?: string
  brand?: string
  variant?: string
  price: number
  quantity?: number
  position?: number
  list?: string
}

interface EcommerceActionField {
  id?: string
  affiliation?: string
  revenue?: number
  tax?: number
  shipping?: number
  coupon?: string
  list?: string
  step?: number
  option?: string
}

interface EcommerceData {
  currencyCode: string
  [actionType: string]: any
}

// Интерфейс для объекта ym и dataLayer
declare global {
  interface Window {
    ym: (id: string, method: string, ...args: any[]) => void
    dataLayer: Array<{
      ecommerce?: EcommerceData
    }>
  }
}

export function YandexMetrika({ 
  counterId,
  webvisor = true,
  clickmap = true,
  trackLinks = true,
  accurateTrackBounce = true
}: YandexMetrikaProps) {
  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') {
      return
    }
    
    // В development режиме показываем предупреждение
    if (import.meta.env.DEV) {
      console.log('🔍 Яндекс.Метрика: Development режим - аналитика отключена')
      return
    }

    // Создаем скрипт Яндекс.Метрики (обновленная версия)
    const script = document.createElement('script')
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

      ym(${counterId}, 'init', {
        ssr: true,
        webvisor: ${webvisor},
        clickmap: ${clickmap},
        ecommerce: "dataLayer",
        accurateTrackBounce: ${accurateTrackBounce},
        trackLinks: ${trackLinks}
      });
    `
    
    document.head.appendChild(script)

    // Добавляем noscript версию
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `
      <div>
        <img src="https://mc.yandex.ru/watch/${counterId}" 
             style="position:absolute; left:-9999px;" 
             alt="" />
      </div>
    `
    document.body.appendChild(noscript)

    // Cleanup при размонтировании
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.body.contains(noscript)) {
        document.body.removeChild(noscript)
      }
    }
  }, [counterId, webvisor, clickmap, trackLinks, accurateTrackBounce])

  return null
}

// Хук для отправки событий в Яндекс.Метрику
export const useYandexMetrika = (counterId: string) => {
  // Достижение цели
  const reachGoal = (target: string, params?: object) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'reachGoal', target, params)
    }
  }

  // Отправка параметров визита
  const params = (parameters: object) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'params', parameters)
    }
  }

  // Установка пользовательских параметров
  const userParams = (parameters: object) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'userParams', parameters)
    }
  }

  // Базовая отправка события электронной торговли согласно документации Яндекса
  const sendEcommerceEvent = (ecommerceData: EcommerceData) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ ecommerce: ecommerceData })
      console.log('📊 Yandex Ecommerce:', ecommerceData)
    }
  }

  // Просмотр товара (detail view)
  const trackProductView = (product: EcommerceProduct, list?: string) => {
    // Цель в Яндекс Метрике
    reachGoal('PRODUCT_VIEW', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price
    })
    
    // Электронная торговля по стандарту Яндекса
    sendEcommerceEvent({
      currencyCode: "RUB",
      detail: {
        products: [{
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || "ДИМБО Пицца",
          category: product.category || "Продукция",
          variant: product.variant,
          list: list || "Каталог продукции",
          position: product.position || 1
        }]
      }
    })
  }

  // Добавление товара в корзину
  const trackAddToCart = (product: EcommerceProduct, list?: string) => {
    // Цель в Яндекс Метрике
    reachGoal('ADD_TO_CART', {
      product_id: product.id,
      product_name: product.name,
      quantity: product.quantity,
      price: product.price
    })
    
    // Электронная торговля по стандарту Яндекса
    sendEcommerceEvent({
      currencyCode: "RUB",
      add: {
        products: [{
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || "ДИМБО Пицца",
          category: product.category || "Продукция",
          variant: product.variant,
          quantity: product.quantity || 1,
          list: list || "Каталог продукции",
          position: product.position || 1
        }]
      }
    })
  }

  // Удаление товара из корзины
  const trackRemoveFromCart = (product: EcommerceProduct, list?: string) => {
    // Цель в Яндекс Метрике
    reachGoal('REMOVE_FROM_CART', {
      product_id: product.id,
      product_name: product.name,
      quantity: product.quantity,
      price: product.price
    })
    
    // Электронная торговля по стандарту Яндекса
    sendEcommerceEvent({
      currencyCode: "RUB",
      remove: {
        products: [{
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || "ДИМБО Пицца",
          category: product.category || "Продукция",
          variant: product.variant,
          quantity: product.quantity || 1,
          list: list || "Корзина",
          position: product.position || 1
        }]
      }
    })
  }

  // Начало оформления заказа (checkout step)
  const trackCheckoutStart = (products: EcommerceProduct[], step: number = 1) => {
    reachGoal('CHECKOUT_START', {
      items_count: products.length,
      total_value: products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
    })
    
    sendEcommerceEvent({
      currencyCode: "RUB",
      checkout: {
        actionField: { step: step },
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || "ДИМБО Пицца",
          category: product.category || "Продукция",
          variant: product.variant,
          quantity: product.quantity || 1
        }))
      }
    })
  }

  // Завершение покупки
  const trackPurchase = (orderId: string, products: EcommerceProduct[], actionField?: Partial<EcommerceActionField>) => {
    const totalRevenue = actionField?.revenue || products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
    
    // Цель в Яндекс Метрике
    reachGoal('ORDER_COMPLETE', {
      order_id: orderId,
      total_amount: totalRevenue,
      items_count: products.length
    })

    // Электронная торговля по стандарту Яндекса
    sendEcommerceEvent({
      currencyCode: "RUB",
      purchase: {
        actionField: {
          id: orderId,
          affiliation: actionField?.affiliation || "ДИМБО Пицца - Доставка пиццы",
          revenue: totalRevenue,
          tax: actionField?.tax,
          shipping: actionField?.shipping,
          coupon: actionField?.coupon
        },
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand || "ДИМБО Пицца",
          category: product.category || "Продукция",
          variant: product.variant,
          quantity: product.quantity || 1
        }))
      }
    })
  }

  const trackDeliveryCalculation = (address: string, cost: number, zone: string) => {
    reachGoal('DELIVERY_CALCULATED', {
      delivery_address: address,
      delivery_cost: cost,
      delivery_zone: zone
    })
  }

  const trackPaymentMethod = (method: 'cash' | 'card' | 'sbp') => {
    reachGoal('PAYMENT_METHOD_SELECTED', {
      payment_method: method
    })
  }

  return {
    // Базовые методы Яндекс Метрики
    reachGoal,
    params,
    userParams,
    
    // Методы электронной торговли (по документации Яндекса)
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackCheckoutStart,
    trackPurchase,
    
    // Дополнительные события для пиццерии
    trackDeliveryCalculation,
    trackPaymentMethod,
    
    // Низкоуровневая отправка ecommerce данных
    sendEcommerceEvent
  }
}

// Компонент для инициализации в App.tsx
interface YandexMetrikaProviderProps {
  counterId: string
  children: React.ReactNode
}

export function YandexMetrikaProvider({ counterId, children }: YandexMetrikaProviderProps) {
  useEffect(() => {
    // Инициализируем dataLayer для электронной торговли
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
    }
  }, [])

  return (
    <>
      <YandexMetrika counterId={counterId} />
      {children}
    </>
  )
}

// Компонент для Яндекс.Вебмастера (валидация)
export function YandexWebmaster({ verificationCode }: { verificationCode: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const meta = document.createElement('meta')
      meta.name = 'yandex-verification'
      meta.content = verificationCode
      document.head.appendChild(meta)

      return () => {
        if (document.head.contains(meta)) {
          document.head.removeChild(meta)
        }
      }
    }
  }, [verificationCode])

  return null
}