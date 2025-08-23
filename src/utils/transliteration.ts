/**
 * @file: transliteration.ts
 * @description: Утилиты для транслитерации русских названий в URL-friendly формат
 * @dependencies: None
 * @created: 2025-01-27
 */

/**
 * Карта транслитерации русских букв в латинские
 */
const transliterationMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
  'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
}

/**
 * Транслитерирует русский текст в латинские буквы
 * @param text - Исходный текст на русском языке
 * @returns Транслитерированный текст
 */
export function transliterate(text: string): string {
  return text
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('')
}

/**
 * Создает URL-friendly slug из названия товара
 * @param productName - Название товара
 * @returns URL-friendly slug
 */
export function createProductSlug(productName: string): string {
  return transliterate(productName)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Удаляем все кроме букв, цифр, пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .replace(/^-|-$/g, '') // Убираем дефисы в начале и конце
}

/**
 * Определяет категорию товара по названию для SEO
 * @param productName - Название товара
 * @returns Категория товара
 */
export function getProductCategory(productName: string): string {
  const name = productName.toLowerCase()
  
  if (name.includes('пицца')) return 'pizza'
  if (name.includes('бургер')) return 'burger'
  if (name.includes('суши') || name.includes('ролл')) return 'sushi'
  if (name.includes('шашлык')) return 'shashlyk'
  if (name.includes('крыл')) return 'wings'
  if (name.includes('картофель') || name.includes('фри')) return 'fries'
  if (name.includes('нагец')) return 'nuggets'
  if (name.includes('стрипс')) return 'strips'
  if (name.includes('коктейль') || name.includes('лимонад')) return 'drinks'
  if (name.includes('соус') || name.includes('кетчуп')) return 'sauces'
  if (name.includes('комбо')) return 'combo'
  if (name.includes('закрытая')) return 'closed-pizza'
  
  return 'other'
}

/**
 * Генерирует SEO-friendly описание товара
 * @param productName - Название товара
 * @param price - Цена товара
 * @param category - Категория товара
 * @returns SEO описание
 */
export function generateProductDescription(productName: string, price: number, category: string): string {
  const categoryDescriptions: Record<string, string> = {
    'pizza': `🍕 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Горячая пицца на дом за 30-60 минут ⭐ Свежие ингредиенты ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'burger': `🍔 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Сочный бургер на дом за 30-60 минут ⭐ Свежие ингредиенты ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'sushi': `🍣 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Свежие суши на дом за 30-60 минут ⭐ Качественная рыба ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'wings': `🍗 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Острые крылышки на дом за 30-60 минут ⭐ Сочное мясо ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'fries': `🍟 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Хрустящий картофель на дом за 30-60 минут ⭐ Золотистая корочка ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'nuggets': `🍗 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Сочные нагетсы на дом за 30-60 минут ⭐ Хрустящая панировка ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'closed-pizza': `🥟 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Закрытая пицца на дом за 30-60 минут ⭐ Сочная начинка ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`,
    'drinks': `🥤 Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Освежающие напитки на дом за 30-60 минут ⭐ Натуральные ингредиенты ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`
  }
  
  return categoryDescriptions[category] || `🍽️ Заказать ${productName} с доставкой в Волжске за ${price}₽ ⭐ Вкусная еда на дом за 30-60 минут ⭐ Качественные ингредиенты ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34`
}

/**
 * Генерирует ключевые слова для товара
 * @param productName - Название товара
 * @param category - Категория товара
 * @returns Строка с ключевыми словами
 */
export function generateProductKeywords(productName: string, category: string): string {
  const baseKeywords = [
    `заказать ${productName.toLowerCase()}`,
    `${productName.toLowerCase()} волжск`,
    `${productName.toLowerCase()} доставка`,
    `${productName.toLowerCase()} на дом`,
    `купить ${productName.toLowerCase()}`,
    `${productName.toLowerCase()} цена`
  ]
  
  const categoryKeywords: Record<string, string[]> = {
    'pizza': ['пицца волжск', 'доставка пиццы', 'заказать пиццу'],
    'burger': ['бургер волжск', 'доставка бургеров', 'заказать бургер'],
    'sushi': ['суши волжск', 'доставка суши', 'заказать суши'],
    'wings': ['крылышки волжск', 'доставка крылышек', 'заказать крылышки'],
    'fries': ['картофель фри волжск', 'доставка картофеля', 'заказать фри'],
    'nuggets': ['нагетсы волжск', 'доставка нагетсов', 'заказать нагетсы'],
    'closed-pizza': ['закрытая пицца волжск', 'доставка закрытой пиццы', 'заказать закрытую пиццу']
  }
  
  const additionalKeywords = categoryKeywords[category] || ['еда волжск', 'доставка еды']
  
  return [...baseKeywords, ...additionalKeywords].join(', ')
}

/**
 * Список всех товаров (будет заполнен из API)
 */
export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
}

/**
 * Данные товаров из API (статический список для генерации)
 */
export const PRODUCTS_DATA: Product[] = [
  { id: 1, name: "Пицца Маргарита", price: 380.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_margarita.png" },
  { id: 2, name: "Грибная пицца", price: 469.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_gribnaya.png" },
  { id: 7, name: "Гавайская пицца", price: 480.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_gavaiyaskay.png" },
  { id: 8, name: "Мясная пицца", price: 500.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_mzysnay.png" },
  { id: 10, name: "Пицца Морская", price: 510.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_karbonara.png" },
  { id: 4, name: "Пицца Салями", price: 490.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_peperoni.png" },
  { id: 5, name: "Пицца Пепперони", price: 470.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_peperoni.png" },
  { id: 6, name: "Пицца Цезарь", price: 480.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_mario.png" },
  { id: 9, name: "Домашняя пицца", price: 480.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_5_chees.png" },
  { id: 3, name: "Сырная пицца", price: 470.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/pizza_cheese.png" },
  { id: 13, name: "Бургер \"Димбургер\"", price: 220.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_classic.png" },
  { id: 15, name: "Бургер \"Чикенбургер\"", price: 180.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_hawaiian.png" },
  { id: 14, name: "Бургер \"Чизбургер\"", price: 200.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_cheeseburger.png" },
  { id: 16, name: "Бургер \"Джуниор\"", price: 160.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/burger_tom_yam.png" },
  { id: 28, name: "Картофель Фри 100 гр.", price: 499.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/free.png" },
  { id: 29, name: "Картофель Фри 150 гр.", price: 499.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/free.png" },
  { id: 30, name: "Нагецы 6 штук", price: 599.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/nagets.png" },
  { id: 31, name: "Нагецы 9 штук", price: 599.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/nagets.png" },
  { id: 32, name: "Нагецы 12 штук", price: 599.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/nagets.png" },
  { id: 35, name: "Крылья 6 штук", price: 679.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/chiken.png" },
  { id: 36, name: "Крылья 9 штук", price: 679.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/chiken.png" },
  { id: 41, name: "Закрытая пицца \"Классическая\"", price: 170.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png" },
  { id: 43, name: "Закрытая пицца \"Охотничья\"", price: 170.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png" },
  { id: 42, name: "Закрытая пицца \"Куриная\"", price: 170.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png" },
  { id: 44, name: "Закрытая пицца \"Сырная\"", price: 170.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png" },
  { id: 45, name: "Закрытая пицца \"Гавайская\"", price: 180.00, imageUrl: "https://s3.twcstorage.ru/f9c8e17a-pizzanat-products/products/closed_pizza.png" }
]
