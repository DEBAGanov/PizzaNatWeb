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

// Волжск — 26 продуктов
export const VOLZHSK_PRODUCT_CITY_PAGES: ProductCityConfig[] = generateCityProductPages(
  'Волжск', 'Волжске', 'product-volzhsk', 'ДИМБО Пицца Волжск', false
)

// Зеленодольск — 26 продуктов
export const ZELENODOLSK_PRODUCT_CITY_PAGES: ProductCityConfig[] = generateCityProductPages(
  'Зеленодольск', 'Зеленодольске', 'product-zelenodolsk', 'ДИМБО Пицца → Зеленодольск', true
)

export const ALL_PRODUCT_CITY_PAGES = [...VOLZHSK_PRODUCT_CITY_PAGES, ...ZELENODOLSK_PRODUCT_CITY_PAGES]
