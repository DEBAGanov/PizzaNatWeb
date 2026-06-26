import { PRODUCTS_DATA } from '../utils/transliteration'

export interface ProductCityConfig {
  product: { id: number; name: string; price: number; imageUrl: string }
  city: string
  slug: string
  title: string
  description: string
  keywords: string
  h1: string
  category: string
  deliveryFrom: string
}

function generateCityProductPages(
  city: string,
  cityGenitive: string,
  suffix: string,
  deliveryFrom: string,
  isZelenodolsk: boolean
): ProductCityConfig[] {
  return PRODUCTS_DATA.map(product => {
    const nameLower = product.name.toLowerCase()
    const cityWord = isZelenodolsk ? 'зеленодольск' : 'волжск'
    const deliveryNote = isZelenodolsk ? ' Доставка из Волжска.' : ''

    return {
      product,
      city,
      slug: `${suffix}-${product.id}`,
      title: `${product.name} — доставка в ${cityGenitive} | ДИМБО Пицца`,
      description: `Заказать ${nameLower} с доставкой в ${cityGenitive}. ${product.price} ₽. Быстрая доставка, свежие ингредиенты.${deliveryNote} ДИМБО Пицца.`,
      keywords: `${nameLower} ${cityWord}, заказать ${nameLower} ${cityWord}, доставка ${nameLower} ${cityWord}, ${product.name} цена`,
      h1: `${product.name} — доставка в ${cityGenitive}`,
      category: getProductCategory(product.name),
      deliveryFrom,
    }
  })
}

function getProductCategory(name: string): string {
  if (name.toLowerCase().includes('пицц') || name.toLowerCase().includes('pitstsa')) return 'pizza'
  if (name.toLowerCase().includes('бургер') || name.toLowerCase().includes('burger')) return 'burgers'
  if (name.toLowerCase().includes('суши') || name.toLowerCase().includes('sushi') || name.toLowerCase().includes('ролл')) return 'sushi'
  if (name.toLowerCase().includes('шашлык')) return 'shashlyk'
  if (name.toLowerCase().includes('крыл')) return 'wings'
  if (name.toLowerCase().includes('фри') || name.toLowerCase().includes('fri')) return 'fries'
  if (name.toLowerCase().includes('нагет')) return 'nuggets'
  return 'food'
}

// ─────────────────────────────────────────────────────────────────────────────
// УНИКАЛЬНЫЙ КОНТЕНТ ПО КАТЕГОРИЯМ (черновик — на ревью владельцу).
// Разбавляет идентичный блок «Почему выбирают нас» на 52 товаро-городских страницах.
// {product}/{delivery} подставляются → текст различается по товару, категории и городу.
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORY_CONTENT: Record<string, string> = {
  pizza: 'Пиццу в ДИМБО готовим на тесте собственного замеса и выпекаем под заказ — поэтому {product} доезжает горячей и ароматной. Везём {delivery} в термоупаковке, которая держит температуру и хрусткость корочки. Это та же пицца, что подаётся у нас в зале, без разницы в качестве. Состав, размер и время доставки уточняйте у оператора.',
  burgers: 'Бургеры в ДИМБО собираем перед самой доставкой: свежая булочка, сочная котлета и фирменные соусы. {product} едет {delivery} в упаковке, которая не даёт ему остыть и размякнуть. Хорошо берут вместе с картофелем фри и напитком — получается полноценный обед. Добавки и соусы можно выбрать при заказе.',
  sushi: 'Суши и роллы в ДИМБО крутят из проверенных ингредиентов и комплектуют имбирём, васаби и соевым соусом. {product} доставляем {delivery} в охлаждённой упаковке, чтобы рис и начинка оставались свежими. Удобно заказывать на компанию — сеты делятся на всех. Состав набора уточняйте у оператора.',
  shashlyk: 'Шашлык в ДИМБО маринуем заранее и жарим на углях под заказ, поэтому {product} приезжает с настоящим дымком. Везём {delivery} в термоупаковке вместе с соусом и луком. Хороший выбор для большой компании или семейного ужина. Вес порции и гарнир уточняйте при заказе.',
  wings: 'Куриные крылья в ДИМБО готовим до румяной корочки и подаём с соусом на выбор. {product} едет {delivery} горячим, в упаковке, которая сохраняет хруст. Берут как самостоятельное блюдо и как закуску к компании. Количество и соус выбираете при заказе.',
  fries: 'Картофель фри в ДИМБО жарим до золотистого хруста и солим сразу после фритюра. {product} доставляем {delivery} в упаковке, которая не даёт ему отмякнуть в дороге. Отличное дополнение к бургеру, крыльям или как отдельный перекус. Размер порции выбираете при заказе.',
  nuggets: 'Наггетсы в ДИМБО — нежное куриное филе в хрустящей панировке, готовим под заказ. {product} едет {delivery} горячим, с соусом на выбор. Любимый формат у детей и удобная закуска для компании. Количество и соус уточняйте при заказе.',
  food: 'Блюда в ДИМБО готовим из свежих ингредиентов под заказ и доставляем горячими. {product} везём {delivery} в термоупаковке, которая сохраняет вкус и температуру. Можно собрать заказ из нескольких категорий — пицца, бургеры, суши, закуски. Состав и время доставки уточняйте у оператора.',
}

export function getProductCityText(productName: string, category: string, isZelenodolsk: boolean): string {
  const base = CATEGORY_CONTENT[category] || CATEGORY_CONTENT.food
  const delivery = isZelenodolsk ? 'из Волжска в Зеленодольск' : 'по Волжску'
  return base
    .replace(/\{product\}/g, productName.toLowerCase())
    .replace(/\{delivery\}/g, delivery)
}

// Волжск — 26 продуктов
export const VOLZHSK_PRODUCT_CITY_PAGES: ProductCityConfig[] = generateCityProductPages(
  'Волжск', 'Волжске', 'product-volzhsk', 'ДИМБО Пицца Волжск', false
)

// Зеленодольск — 26 продуктов
export const ZELENODOLSK_PRODUCT_CITY_PAGES: ProductCityConfig[] = generateCityProductPages(
  'Зеленодольск', 'Зеленодольске', 'product-zelenodolsk', 'ДИМБО Пицца → Зеленодольск', true
)

export const ALL_PRODUCT_CITY_PAGES = [...VOLZHSK_PRODUCT_CITY_PAGES, ...ZELENODOLSK_PRODUCT_CITY_PAGES]
