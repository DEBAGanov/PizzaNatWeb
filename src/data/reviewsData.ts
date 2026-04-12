export interface ReviewsPageConfig {
  slug: string
  city: string
  title: string
  description: string
  keywords: string
  h1: string
  rating: number
  reviewCount: number
  awardBadge: boolean
}

export const REVIEWS_PAGES: ReviewsPageConfig[] = [
  {
    slug: 'otzyvy-dimbo-pizza-volzhsk',
    city: 'Волжск',
    title: 'Отзывы ДИМБО Пицца Волжск — рейтинг 4.8 | Яндекс Карты',
    description: 'Читайте отзывы о ДИМБО Пицца в Волжске. Рейтинг 4.8 из 5 на Яндекс Картах. Награда «Хорошее место 2026». Более 127 отзывов клиентов.',
    keywords: 'отзывы димбо пицца волжск, рейтинг пиццерии волжск, dimbo pizza отзывы, димбо пицца яндекс карты',
    h1: 'Отзывы о ДИМБО Пицца — Волжск',
    rating: 4.8,
    reviewCount: 127,
    awardBadge: true,
  },
  {
    slug: 'otzyvy-dimbo-pizza-zelenodolsk',
    city: 'Зеленодольск',
    title: 'Отзывы ДИМБО Пицца Зеленодольск — доставка из Волжска',
    description: 'Отзывы о доставке ДИМБО Пицца в Зеленодольск. Рейтинг 4.8, более 127 отзывов. Доставка пиццы, суши, шашлыка из Волжска.',
    keywords: 'отзывы димбо пицца зеленодольск, доставка пиццы зеленодольск отзывы, димбо пицца рейтинг',
    h1: 'Отзывы о доставке ДИМБО Пицца — Зеленодольск',
    rating: 4.8,
    reviewCount: 127,
    awardBadge: false,
  },
  {
    slug: 'reyting-pitstserii-volzhsk',
    city: 'Волжск',
    title: 'Рейтинг пиццерии Волжск — ДИМБО Пицца 4.8/5 | ТОП-1',
    description: 'ДИМБО Пицца — лучшая пиццерия Волжска по рейтингу Яндекс Карт. 4.8 из 5, награда «Хорошее место 2026». Читайте отзывы.',
    keywords: 'рейтинг пиццерии волжск, лучшая пиццерия волжск, топ пиццерия волжск, димбо пицца рейтинг',
    h1: 'Рейтинг пиццерии Волжск — ДИМБО Пицца',
    rating: 4.8,
    reviewCount: 127,
    awardBadge: true,
  },
  {
    slug: 'luchshie-otzyvy-dimbo',
    city: 'Волжск',
    title: 'Лучшие отзывы ДИМБО Пицца — что говорят клиенты',
    description: 'Лучшие отзывы клиентов ДИМБО Пицца. Доставка пиццы, суши, шашлыка в Волжске и Зеленодольске. Рейтинг 4.8 из 5.',
    keywords: 'лучшие отзывы пиццерия, отзывы доставка еды волжск, dimbo pizza отзывы клиентов',
    h1: 'Лучшие отзывы — ДИМБО Пицца',
    rating: 4.8,
    reviewCount: 127,
    awardBadge: true,
  },
]
