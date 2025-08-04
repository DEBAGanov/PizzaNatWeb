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

// Интерфейс для объекта ym
declare global {
  interface Window {
    ym: (id: string, method: string, ...args: any[]) => void
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
    // Проверяем, что мы в браузере и не в режиме разработки
    if (typeof window === 'undefined' || import.meta.env.DEV) {
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

  // Отправка события электронной торговли
  const ecommerce = (eventName: string, eventData: object) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        ecommerce: {
          [eventName]: eventData
        }
      })
    }
  }

  // События для пиццерии
  const trackPizzaView = (pizzaId: string, pizzaName: string, category: string, price: number) => {
    reachGoal('PRODUCT_VIEW', {
      product_id: pizzaId,
      product_name: pizzaName,
      category: category,
      price: price
    })
  }

  const trackAddToCart = (pizzaId: string, pizzaName: string, quantity: number, price: number) => {
    reachGoal('ADD_TO_CART', {
      product_id: pizzaId,
      product_name: pizzaName,
      quantity: quantity,
      price: price
    })
    
    // Электронная торговля
    ecommerce('add', {
      items: [{
        item_id: pizzaId,
        item_name: pizzaName,
        item_category: 'Пицца',
        quantity: quantity,
        price: price
      }]
    })
  }

  const trackOrderStart = () => {
    reachGoal('ORDER_START')
  }

  const trackOrderComplete = (orderId: string, totalAmount: number, items: any[]) => {
    reachGoal('ORDER_COMPLETE', {
      order_id: orderId,
      total_amount: totalAmount,
      items_count: items.length
    })

    // Электронная торговля - покупка
    ecommerce('purchase', {
      transaction_id: orderId,
      value: totalAmount,
      currency: 'RUB',
      items: items.map(item => ({
        item_id: item.product_id,
        item_name: item.product_name,
        item_category: 'Пицца',
        quantity: item.quantity,
        price: item.price
      }))
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
    reachGoal,
    params,
    userParams,
    ecommerce,
    trackPizzaView,
    trackAddToCart,
    trackOrderStart,
    trackOrderComplete,
    trackDeliveryCalculation,
    trackPaymentMethod
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