/**
 * @file: seo.ts
 * @description: Утилиты для SEO оптимизации сайта
 * @dependencies: React, meta tags
 * @created: 2025-01-24
 */

interface SeoData {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  structuredData?: object
}

// Базовые SEO настройки для г. Волжск
export const BASE_SEO = {
  siteName: 'ДИМБО Пицца - Доставка пиццы в Волжске',
  defaultTitle: 'ДИМБО Пицца - Вкусная пицца с доставкой по Волжску',
  defaultDescription: 'Закажите горячую пиццу с бесплатной доставкой по Волжску. Свежие ингредиенты, быстрая доставка 30-60 минут. Минимальный заказ от 300₽.',
  baseUrl: 'https://dimbopizza.ru',
  city: 'Волжск',
  region: 'Республика Марий Эл',
  phone: '+7 (906) 138-28-68', // TODO: добавить реальный номер
  email: 'info@dimbopizza.ru'
}

// Ключевые слова для локального SEO
export const LOCAL_KEYWORDS = [
  'заказать пиццу Волжск',
  'доставка пиццы Волжск',
  'пицца Волжск',
  'ДИМБО пицца',
  'доставка еды Волжск',
  'быстрая доставка Волжск',
  'горячая пицца Волжск',
  'пицца с доставкой Марий Эл',
  'заказ пиццы онлайн Волжск',
  'вкусная пицца Волжск'
]

// Генерация мета-тегов для страниц
export const generatePageSeo = (page: string, data?: Partial<SeoData>): SeoData => {
  const baseKeywords = [...LOCAL_KEYWORDS]
  
  switch (page) {
    case 'home':
      return {
        title: data?.title || BASE_SEO.defaultTitle,
        description: data?.description || BASE_SEO.defaultDescription,
        keywords: [...baseKeywords, 'главная', 'меню пиццы'],
        ogTitle: `${BASE_SEO.siteName} - Главная`,
        ogDescription: 'Лучшая пицца в Волжске с доставкой на дом. Свежие ингредиенты, доступные цены, быстрая доставка.',
        canonical: BASE_SEO.baseUrl
      }
      
    case 'menu':
      return {
        title: `Меню пиццы - ${BASE_SEO.siteName}`,
        description: 'Большой выбор вкусной пиццы в Волжске. Классические и авторские рецепты. Заказывайте онлайн с доставкой на дом.',
        keywords: [...baseKeywords, 'меню пиццы', 'виды пиццы', 'каталог'],
        ogTitle: 'Меню пиццы ДИМБО - Волжск',
        ogDescription: 'Посмотрите наше полное меню пиццы. Более 20 видов на любой вкус.',
        canonical: `${BASE_SEO.baseUrl}/menu`
      }
      
    case 'cart':
      return {
        title: `Корзина - ${BASE_SEO.siteName}`,
        description: 'Оформите заказ пиццы в Волжске. Быстрое оформление, удобная оплата, доставка 30-60 минут.',
        keywords: [...baseKeywords, 'корзина', 'оформить заказ'],
        canonical: `${BASE_SEO.baseUrl}/cart`
      }
      
    case 'checkout':
      return {
        title: `Оформление заказа - ${BASE_SEO.siteName}`,
        description: 'Завершите заказ пиццы в Волжске. Выберите адрес доставки и способ оплаты.',
        keywords: [...baseKeywords, 'оформление заказа', 'доставка'],
        canonical: `${BASE_SEO.baseUrl}/checkout`
      }
      
    case 'kids':
      return {
        title: `ДИМБО детям - мастер-классы и дни рождения в пиццерии Волжск | ${BASE_SEO.siteName}`,
        description: 'Мастер-классы по приготовлению пиццы для детей от 4 лет в ДИМБО Пицца Волжск. Празднование дня рождения, игровые комнаты, раскраски и развивающие активности.',
        keywords: [...baseKeywords, 'мастер-класс пицца дети', 'день рождения пиццерия Волжск', 'ДИМБО дети', 'детские праздники Волжск', 'обучение готовке детей', 'игровая комната пиццерия'],
        ogTitle: 'ДИМБО детям - мастер-классы в пиццерии Волжск',
        ogDescription: 'Незабываемые мастер-классы и дни рождения для детей в ДИМБО Пицца. Обучение готовке, игры и развлечения.',
        canonical: `${BASE_SEO.baseUrl}/dimbokids`
      }
      
    default:
      return {
        title: BASE_SEO.defaultTitle,
        description: BASE_SEO.defaultDescription,
        keywords: baseKeywords,
        canonical: BASE_SEO.baseUrl
      }
  }
}

// Генерация мета-тегов для категорий
export const generateCategorySeo = (categoryName: string, description?: string): SeoData => {
  return {
    title: `${categoryName} - Заказать в Волжске | ${BASE_SEO.siteName}`,
    description: description || `Вкусная ${categoryName.toLowerCase()} с доставкой по Волжску. Свежие ингредиенты, быстрая доставка. Заказывайте онлайн!`,
    keywords: [
      ...LOCAL_KEYWORDS,
      categoryName.toLowerCase(),
      `заказать ${categoryName.toLowerCase()} Волжск`,
      `доставка ${categoryName.toLowerCase()}`
    ],
    ogTitle: `${categoryName} от ДИМБО Пицца`,
    canonical: `${BASE_SEO.baseUrl}/menu?category=${categoryName.toLowerCase()}`
  }
}

// Генерация мета-тегов для товаров
export const generateProductSeo = (productName: string, price: number, description?: string): SeoData => {
  return {
    title: `${productName} за ${price}₽ - Заказать с доставкой в Волжске | ${BASE_SEO.siteName}`,
    description: description || `Заказать ${productName.toLowerCase()} в Волжске за ${price}₽. Доставка горячей пиццы 30-60 минут. Свежие ингредиенты, отличный вкус.`,
    keywords: [
      ...LOCAL_KEYWORDS,
      productName.toLowerCase(),
      `заказать ${productName.toLowerCase()}`,
      `${productName.toLowerCase()} цена`,
      `${productName.toLowerCase()} Волжск`
    ],
    ogTitle: `${productName} - ${price}₽`,
    ogDescription: `Попробуйте нашу ${productName.toLowerCase()} всего за ${price}₽. Заказ онлайн с доставкой по Волжску.`
  }
}

// JSON-LD разметка для локального бизнеса
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "ДИМБО Пицца",
    "description": "Доставка вкусной пиццы в г. Волжск, Республика Марий Эл",
    "url": BASE_SEO.baseUrl,
    "telephone": BASE_SEO.phone,
    "email": BASE_SEO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BASE_SEO.city,
      "addressRegion": BASE_SEO.region,
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "56.1194", // Координаты Волжска
      "longitude": "47.8681"
    },
    "servesCuisine": "Итальянская, Пицца",
    "priceRange": "300-1500 RUB",
    "currenciesAccepted": "RUB",
    "paymentAccepted": "Cash, Card, SBP",
    "hasMenu": `${BASE_SEO.baseUrl}/menu`,
    "acceptsReservations": false,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "openingHours": [
      "Mo-Su 10:00-20:00"
    ]
  }
}

// JSON-LD разметка для продукта/пиццы
export const generateProductSchema = (product: {
  name: string
  description: string
  price: number
  image?: string
  category: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || `${BASE_SEO.baseUrl}/images/pizza-placeholder.jpg`,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "ДИМБО Пицца"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ДИМБО Пицца"
      },
      "areaServed": {
        "@type": "City",
        "name": BASE_SEO.city
      }
    }
  }
}

// Хлебные крошки (BreadcrumbList)
export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }
}

// Функция для установки мета-тегов
export const setPageMeta = (seoData: SeoData) => {
  // Title
  document.title = seoData.title
  
  // Description
  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', seoData.description)
  }
  
  // Keywords
  const keywordsMeta = document.querySelector('meta[name="keywords"]')
  if (keywordsMeta) {
    keywordsMeta.setAttribute('content', seoData.keywords.join(', '))
  }
  
  // Open Graph
  if (seoData.ogTitle) {
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', seoData.ogTitle)
    }
  }
  
  if (seoData.ogDescription) {
    const ogDescMeta = document.querySelector('meta[property="og:description"]')
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', seoData.ogDescription)
    }
  }
  
  // Canonical
  if (seoData.canonical) {
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seoData.canonical)
    }
  }
  
  // Structured data
  if (seoData.structuredData) {
    let scriptElement = document.querySelector('script[type="application/ld+json"]')
    if (!scriptElement) {
      scriptElement = document.createElement('script')
      scriptElement.type = 'application/ld+json'
      document.head.appendChild(scriptElement)
    }
    scriptElement.textContent = JSON.stringify(seoData.structuredData)
  }
}

// Индексирующие тексты для разных блоков
export const INDEXING_TEXTS = {
  homePage: {
    hero: "Добро пожаловать в ДИМБО Пицца - лучший выбор для заказа вкусной пиццы в Волжске! Мы готовим настоящую итальянскую пиццу из свежих ингредиентов и доставляем горячей прямо к вашему дому.",
    advantages: "Почему выбирают именно нас в Волжске? Быстрая доставка за 30-60 минут, только свежие продукты, доступные цены и дружелюбный сервис. Работаем ежедневно с 10:00 до 20:00 по всему городу.",
    delivery: "Доставляем пиццу по всему Волжску и окрестностям. Бесплатная доставка при заказе от 800₽ в центральных районах. Принимаем оплату наличными, картой или через СБП."
  },
  
  menuPage: {
    intro: "Наше меню пиццы в Волжске создано с любовью к классическим итальянским традициям. Мы предлагаем широкий выбор: от традиционной Маргариты до авторских рецептов с уникальными сочетаниями вкусов.",
    categories: "В каталоге представлены классические пиццы, мясные, вегетарианские варианты, а также напитки и десерты. Каждая пицца готовится на тонком тесте с добавлением качественной моцареллы и отборных ингредиентов.",
    ordering: "Заказать пиццу в Волжске стало еще проще! Добавляйте понравившиеся позиции в корзину, указывайте адрес доставки и наслаждайтесь горячей пиццей уже через час."
  },
  
  about: {
    story: "ДИМБО Пицца - это семейная пиццерия в Волжске, где каждое блюдо готовится с душой. Мы открылись с миссией принести настоящий итальянский вкус в каждый дом нашего уютного города.",
    quality: "Используем только отборные ингредиенты: итальянскую муку для теста, натуральную моцареллу, свежие овощи и качественные мясные продукты. Наши повара - настоящие мастера своего дела.",
    service: "Гордимся тем, что создаем не просто пиццу, а настоящие гастрономические впечатления для жителей Волжска. Каждый заказ - это проявление нашей заботы о вас."
  }
}