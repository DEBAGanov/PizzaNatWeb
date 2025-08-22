/**
 * @file: SchemaMarkup.tsx
 * @description: React компонент для добавления Schema.org разметки на страницы
 * @dependencies: Schema.org utils
 * @created: 2025-01-27
 */

import { useEffect } from 'react'
import { 
  generateRestaurantSchema, 
  generateLocalBusinessSchema, 
  generateSEOPageSchema,
  generateFAQSchema
} from '../../utils/schemaOrg'

interface SchemaMarkupProps {
  pageType?: 'pizza' | 'sushi' | 'shashlyk' | 'burgers' | 'wings' | 'fries' | 'food'
  customSchema?: object[]
  includeFAQ?: boolean
  faqData?: Array<{question: string, answer: string}>
}

export function SchemaMarkup({ 
  pageType, 
  customSchema = [], 
  includeFAQ = false, 
  faqData = [] 
}: SchemaMarkupProps) {
  
  useEffect(() => {
    // Удаляем существующие schema теги
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]')
    existingSchemas.forEach(script => script.remove())
    
    const schemas: object[] = []
    
    // Базовые схемы для всех SEO-страниц
    if (pageType) {
      const seoSchemas = generateSEOPageSchema(pageType)
      schemas.push(seoSchemas.restaurant, seoSchemas.localBusiness)
    } else {
      // Для обычных страниц только базовые схемы
      schemas.push(generateRestaurantSchema(), generateLocalBusinessSchema())
    }
    
    // FAQ схема если требуется
    if (includeFAQ && faqData.length > 0) {
      schemas.push(generateFAQSchema(faqData))
    }
    
    // Кастомные схемы
    schemas.push(...customSchema)
    
    // Вставляем все схемы
    schemas.forEach(schema => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })
    
    return () => {
      // Cleanup при размонтировании
      const allSchemas = document.querySelectorAll('script[type="application/ld+json"]')
      allSchemas.forEach(script => script.remove())
    }
  }, [pageType, customSchema, includeFAQ, faqData])
  
  return null // Компонент ничего не рендерит
}

// Готовые FAQ данные для разных типов страниц
export const PIZZA_FAQ = [
  {
    question: "Сколько стоит доставка пиццы в Волжске?",
    answer: "Доставка пиццы бесплатная при заказе от 800₽, иначе стоимость доставки составляет 150₽"
  },
  {
    question: "За какое время доставляется пицца?",
    answer: "Доставка пиццы по Волжску занимает от 30 до 60 минут в зависимости от района"
  },
  {
    question: "В какие районы Волжска доставляете пиццу?",
    answer: "Мы доставляем пиццу по всему Волжску: центральные районы, спальные кварталы и окраины города"
  },
  {
    question: "До какого времени работает доставка пиццы?",
    answer: "Доставка пиццы работает ежедневно с 10:00 до 20:00"
  }
]

export const SUSHI_FAQ = [
  {
    question: "Сколько стоит доставка суши в Волжске?",
    answer: "Доставка суши бесплатная при заказе от 800₽, иначе стоимость составляет 150₽"
  },
  {
    question: "Насколько свежие суши при доставке?",
    answer: "Суши готовятся только после получения заказа из свежей рыбы, которая поставляется ежедневно"
  },
  {
    question: "За какое время доставляются суши?",
    answer: "Доставка суши по Волжску занимает от 30 до 60 минут в специальной холодильной сумке"
  }
]

export const SHASHLYK_FAQ = [
  {
    question: "Как готовится шашлык для доставки?",
    answer: "Шашлык готовится на березовых углях только после получения заказа из свежего маринованного мяса"
  },
  {
    question: "Сколько стоит доставка шашлыка?",
    answer: "Доставка шашлыка бесплатная при заказе от 800₽, иначе 150₽"
  },
  {
    question: "Остается ли шашлык горячим при доставке?",
    answer: "Да, шашлык доставляется в специальной термоупаковке, которая сохраняет температуру"
  }
]

export const FOOD_FAQ = [
  {
    question: "Какую еду можно заказать с доставкой в Волжске?",
    answer: "У нас можно заказать пиццу, суши, шашлык, бургеры, крылышки, картофель фри и другие блюда"
  },
  {
    question: "Сколько стоит доставка еды по Волжску?",
    answer: "Доставка еды бесплатная от 800₽ в центральных районах, от 1000₽ в спальных и от 1200₽ на окраинах"
  },
  {
    question: "До какого времени работает доставка еды?",
    answer: "Принимаем заказы на еду ежедневно с 10:00 до 20:00"
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Можно оплатить наличными курьеру, банковской картой или через СБП"
  }
]
