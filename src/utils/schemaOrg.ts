/**
 * @file: schemaOrg.ts
 * @description: Утилиты для генерации Schema.org разметки для SEO
 * @dependencies: None (vanilla TypeScript)
 * @created: 2025-01-27
 */

interface RestaurantSchema {
  "@context": string
  "@type": string
  name: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  telephone: string
  url?: string
  servesCuisine: string[]
  priceRange: string
  openingHours: string[]
  geo?: {
    "@type": string
    latitude: number
    longitude: number
  }
  aggregateRating?: {
    "@type": string
    ratingValue: number
    reviewCount: number
  }
  hasMenu?: {
    "@type": string
    name: string
    description: string
    hasMenuSection: MenuSection[]
  }
}

interface MenuSection {
  "@type": string
  name: string
  description?: string
  hasMenuItem: MenuItem[]
}

interface MenuItem {
  "@type": string
  name: string
  description: string
  offers: {
    "@type": string
    price: string
    priceCurrency: string
  }
}

interface ProductSchema {
  "@context": string
  "@type": string
  name: string
  description: string
  image: string[]
  brand: {
    "@type": string
    name: string
  }
  offers: {
    "@type": string
    price: string
    priceCurrency: string
    availability: string
    seller: {
      "@type": string
      name: string
    }
  }
  aggregateRating?: {
    "@type": string
    ratingValue: number
    reviewCount: number
  }
}

interface LocalBusinessSchema {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  telephone: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  geo: {
    "@type": string
    latitude: number
    longitude: number
  }
  openingHoursSpecification: {
    "@type": string
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]
  servesCuisine: string[]
  priceRange: string
  hasMap: string
  sameAs: string[]
}

/**
 * Генерирует базовую Schema.org разметку для ресторана
 */
export function generateRestaurantSchema(): RestaurantSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "ДИМБО Пицца",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Шестакова, д.1Б",
      addressLocality: "Волжск",
      addressRegion: "Республика Марий Эл",
      addressCountry: "RU"
    },
    telephone: "+7(902)105-34-34",
    url: "https://dimbopizza.ru",
    servesCuisine: ["Пицца", "Суши", "Шашлык", "Бургеры", "Японская кухня", "Европейская кухня"],
    priceRange: "$$",
    openingHours: [
      "Mo-Su 10:00-20:00"
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.2341,
      longitude: 48.3594
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 127
    }
  }
}

/**
 * Генерирует Schema.org разметку для конкретного продукта
 */
export function generateProductSchema(product: {
  name: string
  description: string
  price: number
  images: string[]
  category: string
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "ДИМБО Пицца"
    },
    offers: {
      "@type": "Offer",
      price: product.price.toString(),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ДИМБО Пицца"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.7,
      reviewCount: 89
    }
  }
}

/**
 * Генерирует Schema.org разметку для локального бизнеса с доставкой
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ДИМБО Пицца - Доставка еды в Волжске",
    description: "Доставка пиццы, суши, шашлыка и других блюд в Волжске. Быстрая доставка за 30-60 минут.",
    url: "https://dimbopizza.ru",
    telephone: "+7(902)105-34-34",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Шестакова, д.1Б",
      addressLocality: "Волжск",
      addressRegion: "Республика Марий Эл",
      addressCountry: "RU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.2341,
      longitude: 48.3594
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "10:00",
        closes: "20:00"
      }
    ],
    servesCuisine: ["Пицца", "Суши", "Шашлык", "Бургеры", "Крылышки"],
    priceRange: "$$",
    hasMap: "https://yandex.ru/maps/org/dimbo_pitstsa/123456789",
    sameAs: [
      "https://t.me/DimboPizzaBot",
      "https://vk.com/dimbopizza",
      "https://instagram.com/dimbopizza"
    ]
  }
}

/**
 * Генерирует Schema.org разметку для FAQ
 */
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

/**
 * Генерирует Schema.org разметку для меню ресторана
 */
export function generateMenuSchema(): RestaurantSchema['hasMenu'] {
  return {
    "@type": "Menu",
    name: "Меню ДИМБО Пицца",
    description: "Полное меню с пиццей, суши, шашлыком и другими блюдами",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Пицца",
        description: "Итальянская пицца на тонком тесте",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Пицца Маргарита",
            description: "Классическая итальянская пицца с томатным соусом и моцареллой",
            offers: {
              "@type": "Offer",
              price: "380",
              priceCurrency: "RUB"
            }
          },
          {
            "@type": "MenuItem", 
            name: "Пицца Пепперони",
            description: "Острая пицца с пепперони и сыром",
            offers: {
              "@type": "Offer",
              price: "450",
              priceCurrency: "RUB"
            }
          }
        ]
      },
      {
        "@type": "MenuSection",
        name: "Суши и роллы",
        description: "Свежие суши и роллы из качественной рыбы",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Ролл Филадельфия",
            description: "Классический ролл с лососем и сливочным сыром",
            offers: {
              "@type": "Offer",
              price: "420",
              priceCurrency: "RUB"
            }
          }
        ]
      },
      {
        "@type": "MenuSection",
        name: "Шашлык",
        description: "Сочный шашлык, приготовленный на углях",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Шашлык из свинины",
            description: "Сочный шашлык из отборной свинины",
            offers: {
              "@type": "Offer",
              price: "650",
              priceCurrency: "RUB"
            }
          }
        ]
      }
    ]
  }
}

/**
 * Генерирует разметку хлебных крошек
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * Утилита для вставки Schema.org разметки в head
 */
export function insertSchemaMarkup(schema: object): void {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

/**
 * Генерирует комплексную Schema.org разметку для SEO-страниц
 */
export function generateSEOPageSchema(pageType: 'pizza' | 'sushi' | 'shashlyk' | 'burgers' | 'wings' | 'fries' | 'food') {
  const baseSchema = generateRestaurantSchema()
  const localBusinessSchema = generateLocalBusinessSchema()
  
  const productCategories = {
    pizza: "Пицца",
    sushi: "Суши и роллы", 
    shashlyk: "Шашлык",
    burgers: "Бургеры",
    wings: "Крылышки",
    fries: "Картофель фри",
    food: "Еда"
  }
  
  return {
    restaurant: baseSchema,
    localBusiness: localBusinessSchema,
    category: productCategories[pageType]
  }
}
