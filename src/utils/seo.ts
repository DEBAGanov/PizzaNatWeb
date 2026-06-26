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
  siteName: 'ДИМБО Пицца - Вкуснее всех в Волжске',
  defaultTitle: 'ДИМБО Пицца - Вкуснее всех в Волжске | Доставка 30-60 минут',
  defaultDescription: 'ДИМБО Пицца - вкуснее альтернатива Додо Пицца в Волжске! Свежие ингредиенты, итальянские рецепты, быстрая доставка. Дешевле конкурентов, вкуснее сетевых пиццерий.',
  baseUrl: 'https://dimbopizza.ru',
  defaultOgImage: 'https://dimbopizza.ru/images/logo/dimbopizza1200x630.png',
  city: 'Волжск',
  region: 'Республика Марий Эл',
  phone: '+7 (906) 138-28-68',
  email: 'info@dimbopizza.ru',
  // Конкурентные преимущества
  advantages: [
    'Лучше Додо Пиццы',
    'Дешевле Pizza Time',
    'Быстрее Pizza Express',
    'Вкуснее Модерниссимо',
    'Качественнее сетевых конкурентов'
  ]
}

// Ключевые слова для локального SEO (обновлено на основе анализа конкурентов)
export const LOCAL_KEYWORDS = [
  // 🎯 ОСНОВНЫЕ КОНКУРЕНТНЫЕ (по образцу Додо Пиццы)
  'заказать пиццу Волжск',
  'доставка пиццы Волжск',
  'пиццерия Волжск',
  'пицца Волжск',
  'ДИМБО пицца',
  'доставка еды Волжск',
  'быстрая доставка Волжск',
  'горячая пицца Волжск',
  'лучшая пицца Волжск',
  
  // 🎯 ДОДО-СТИЛЬ ЛОКАЛЬНЫЕ ЗАПРОСЫ
  'пицца в волжске',
  'доставка пиццы в волжске',
  'заказать пиццу в волжске',
  'пиццерия в волжске',
  'пицца волжск онлайн',
  'пицца волжск меню',
  'пицца волжск цены',
  'пицца волжск отзывы',
  'пицца волжск адрес',
  'пицца волжск телефон',
  
  // 🏪 ПРОТИВ КОНКУРЕНТОВ (расширенный список)
  'лучше додо пиццы Волжск',
  'альтернатива додо пицца Волжск',
  'дешевле pizza time Волжск', 
  'быстрее pizza express Волжск',
  'вкуснее модерниссимо Волжск',
  
  // 🏪 ДОДО-СТИЛЬ КОНКУРЕНТНЫЕ ЗАПРОСЫ
  'димбо vs додо пицца',
  'димбо или додо волжск',
  'что лучше димбо или додо',
  'сравнение пиццерий волжск',
  'димбо пицца отзывы волжск',
  'димбо пицца рейтинг',
  'местная пиццерия волжск',
  'не додо пицца волжск',
  
  // 📍 ГЕОЛОКАЦИОННЫЕ
  'пицца ленина Волжск',
  'доставка пиццы центр Волжск',
  'пиццерия марий эл',
  'пицца Волжск ленина 52',
  'доставка еды Волжск центр',
  
  // 🥇 КАЧЕСТВЕННЫЕ ПРЕИМУЩЕСТВА
  'свежая пицца Волжск',
  'качественная пицца Волжск',
  'недорогая пицца Волжск',
  'быстрая доставка пиццы Волжск',
  'итальянская пицца Волжск',
  
  // 📱 БРЕНДОВЫЕ
  'ДИМБО пицца',
  'димбо пицца Волжск',
  'dimbo pizza',
  'дымбо пицца',
  
  // 🍕 ТОВАРНЫЕ - ПИЦЦА
  'пепперони Волжск',
  'маргарита пицца Волжск',
  'четыре сыра Волжск',
  'мясная пицца Волжск',
  'большая пицца Волжск',
  'закрытая пицца',
  'закрытая пицца Волжск',
  'кальцоне Волжск',
  'заказать закрытую пиццу',
  'доставка закрытой пиццы',
  'кальцоне доставка Волжск',
  
  // 🍔 ТОВАРНЫЕ - БУРГЕРЫ
  'бургеры',
  'бургеры Волжск',
  'заказать бургеры',
  'доставка бургеров',
  'бургеры доставка Волжск',
  'заказать бургеры Волжск',
  'бургер с картошкой фри',
  'чизбургер Волжск',
  'гамбургер доставка',
  'сочные бургеры Волжск',
  'американская кухня Волжск',
  
  // 🍣 ТОВАРНЫЕ - СУШИ И РОЛЛЫ
  'суши',
  'суши Волжск',
  'роллы',
  'роллы Волжск',
  'заказать суши',
  'заказать роллы',
  'доставка суши',
  'доставка роллов',
  'суши доставка Волжск',
  'роллы доставка Волжск',
  'заказать суши Волжск',
  'заказать роллы Волжск',
  'филадельфия Волжск',
  'калифорния Волжск',
  'японская кухня Волжск',
  'суши роллы доставка Волжск',
  'свежие суши Волжск',
  'качественные роллы',
  'суши и роллы на дом',
  
  // 🚀 СЕРВИСНЫЕ - ОБЩИЕ
  'пицца онлайн Волжск',
  'заказ пиццы онлайн Волжск',
  'доставка пиццы на дом Волжск',
  'пицца с доставкой Марий Эл',
  'заказ пиццы онлайн Волжск',
  'вкусная пицца Волжск',
  'суши роллы доставка',
  'доставка роллов',
  'доставка пиццы',
  'еда заказать',
  'заказ еды',
  'заказ еды на дом',
  'доставка еды Волжск',
  'заказать еду онлайн',
  'ресторан доставка Волжск',
  'кафе доставка Волжск',
  
  // 🚀 СЕРВИСНЫЕ - СПЕЦИФИЧЕСКИЕ
  'заказать пиццу с доставкой',
  'заказ еды на дом',
  'заказать суши и роллы с доставкой',
  'доставка пиццы на дом',
  'доставка пиццы',
  'додо пицца доставка',
  'суши пицца доставка',
  'заказать пиццу с доставкой на дом',
  'пиццерия',
  'пицца заказать',
  'pizza',
  'заказ пиццы',
  'пицца на заказ',
  'пиццерия доставка',
  'кафе пиццерия',
  'заказать пиццу',
  'пицца',
  'пицца сколько',
  'жар пицца',
  'пицца телефон',
  'пицца скачать',
  'додо пицца ул'
]

// Генерация мета-тегов для страниц
export const generatePageSeo = (page: string, data?: Partial<SeoData>): SeoData => {
  const baseKeywords = [...LOCAL_KEYWORDS]
  
  const addBaseOpenGraph = (seoData: Partial<SeoData>): SeoData => ({
    ...seoData,
    ogImage: seoData.ogImage || data?.ogImage || BASE_SEO.defaultOgImage,
    keywords: seoData.keywords || baseKeywords,
    title: seoData.title || BASE_SEO.defaultTitle,
    description: seoData.description || BASE_SEO.defaultDescription
  } as SeoData)
  
  switch (page) {
    case 'home':
      return addBaseOpenGraph({
        title: data?.title || BASE_SEO.defaultTitle,
        description: data?.description || BASE_SEO.defaultDescription,
        keywords: [...baseKeywords, 'главная', 'меню пиццы'],
        ogTitle: `${BASE_SEO.siteName} - Главная`,
        ogDescription: 'Вкуснее всех пицца в Волжске с доставкой на дом. Свежие ингредиенты, доступные цены, быстрая доставка.',
        canonical: BASE_SEO.baseUrl
      })
      
    case 'menu':
      return addBaseOpenGraph({
        title: `Меню пиццы - ${BASE_SEO.siteName}`,
        description: 'Большой выбор вкусной пиццы в Волжске. Классические и авторские рецепты. Заказывайте онлайн с доставкой на дом.',
        keywords: [...baseKeywords, 'меню пиццы', 'виды пиццы', 'каталог'],
        ogTitle: 'Меню пиццы ДИМБО - Волжск',
        ogDescription: 'Посмотрите наше полное меню пиццы. Более 20 видов на любой вкус.',
        canonical: `${BASE_SEO.baseUrl}/menu`
      })
      
    case 'cart':
      return addBaseOpenGraph({
        title: `Корзина - ${BASE_SEO.siteName}`,
        description: 'Оформите заказ пиццы в Волжске. Быстрое оформление, удобная оплата, доставка 30-60 минут.',
        keywords: [...baseKeywords, 'корзина', 'оформить заказ'],
        canonical: `${BASE_SEO.baseUrl}/cart`
      })
      
    case 'checkout':
      return addBaseOpenGraph({
        title: `Оформление заказа - ${BASE_SEO.siteName}`,
        description: 'Завершите заказ пиццы в Волжске. Выберите адрес доставки и способ оплаты.',
        keywords: [...baseKeywords, 'оформление заказа', 'доставка'],
        canonical: `${BASE_SEO.baseUrl}/checkout`
      })
      
    case 'kids':
      return addBaseOpenGraph({
        title: `ДИМБО детям - мастер-классы и дни рождения в пиццерии Волжск | ${BASE_SEO.siteName}`,
        description: 'Мастер-классы по приготовлению пиццы для детей от 4 лет в ДИМБО Пицца Волжск. Празднование дня рождения, игровые комнаты, раскраски и развивающие активности.',
        keywords: [...baseKeywords, 'мастер-класс пицца дети', 'день рождения пиццерия Волжск', 'ДИМБО дети', 'детские праздники Волжск', 'обучение готовке детей', 'игровая комната пиццерия'],
        ogTitle: 'ДИМБО детям - мастер-классы в пиццерии Волжск',
        ogDescription: 'Незабываемые мастер-классы и дни рождения для детей в ДИМБО Пицца. Обучение готовке, игры и развлечения.',
        canonical: `${BASE_SEO.baseUrl}/dimbokids`
      })
      
    default: {
      // Раньше default-ветка хардкодила дефолтную мету и canonical на главную,
      // из-за чего все SEO-страницы дублировались и склеивались с главной.
      // Теперь: используем переданные данные страницы, а canonical выводим из
      // реального URL (self-canonical) — это выводит ~175 страниц из-под склейки
      // с главной без правки каждой страницы и без смены слугов.
      const selfCanonical =
        data?.canonical ||
        (typeof window !== 'undefined'
          ? `${BASE_SEO.baseUrl}${window.location.pathname}`
          : BASE_SEO.baseUrl)
      return addBaseOpenGraph({
        title: data?.title,
        description: data?.description,
        keywords: data?.keywords,
        canonical: selfCanonical
      })
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
    ogImage: BASE_SEO.defaultOgImage,
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
    ogDescription: `Попробуйте нашу ${productName.toLowerCase()} всего за ${price}₽. Заказ онлайн с доставкой по Волжску.`,
    ogImage: BASE_SEO.defaultOgImage
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
  
  if (seoData.ogImage) {
    const ogImageMeta = document.querySelector('meta[property="og:image"]')
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', seoData.ogImage)
    }
  }
  
  // Обновляем og:url для текущей страницы
  const ogUrlMeta = document.querySelector('meta[property="og:url"]')
  if (ogUrlMeta) {
    ogUrlMeta.setAttribute('content', window.location.href)
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
    let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
    if (!scriptElement) {
      scriptElement = document.createElement('script') as HTMLScriptElement
      scriptElement.type = 'application/ld+json'
      document.head.appendChild(scriptElement)
    }
    scriptElement.textContent = JSON.stringify(seoData.structuredData)
  }
}

// Индексирующие тексты для разных блоков
export const INDEXING_TEXTS = {
  homePage: {
    hero: "Добро пожаловать в ДИМБО Пицца - вкуснее всех выбор для заказа вкусной пиццы в Волжске! Мы готовим настоящую итальянскую пиццу из свежих ингредиентов и доставляем горячей прямо к вашему дому.",
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