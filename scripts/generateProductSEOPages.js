/**
 * @file: generateProductSEOPages.js
 * @description: Скрипт для генерации индивидуальных SEO страниц для всех товаров
 * @created: 2025-01-27
 */

const fs = require('fs')
const path = require('path')

// Карта транслитерации
const transliterationMap = {
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

// Функция транслитерации
function transliterate(text) {
  return text
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('')
}

// Создание URL-friendly slug
function createProductSlug(productName) {
  return transliterate(productName)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Данные товаров
const products = [
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

// Шаблон для создания компонента страницы товара
function generateProductPageComponent(product, slug) {
  const componentName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'SEOPage'

  return `/**
 * @file: ${componentName}.tsx
 * @description: SEO страница для товара "${product.name}"
 * @dependencies: ProductSEOTemplate
 * @created: 2025-01-27
 * @generated: true
 */

import React from 'react'
import { ProductSEOTemplate } from './ProductSEOTemplate'
import type { Product } from '../../utils/transliteration'

const product: Product = {
  id: ${product.id},
  name: "${product.name}",
  price: ${product.price},
  imageUrl: "${product.imageUrl}"
}

export function ${componentName}() {
  return <ProductSEOTemplate product={product} page="${slug}" />
}

export default ${componentName}
`
}

// Создание директории для страниц товаров
const pagesDir = path.join(__dirname, '../src/pages/product-seo/products')
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true })
}

// Генерация страниц для каждого товара
const generatedPages = []
const routes = []

products.forEach(product => {
  const slug = createProductSlug(product.name)
  const componentName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('') + 'SEOPage'
  
  const fileName = `${componentName}.tsx`
  const filePath = path.join(pagesDir, fileName)
  
  // Генерируем компонент
  const componentCode = generateProductPageComponent(product, slug)
  fs.writeFileSync(filePath, componentCode)
  
  generatedPages.push({
    product: product.name,
    slug,
    componentName,
    fileName,
    url: `/${slug}`
  })
  
  routes.push({
    path: `/${slug}`,
    component: componentName,
    import: `import { ${componentName} } from './pages/product-seo/products/${componentName}'`
  })
  
  console.log(`✅ Создана страница: ${product.name} -> /${slug}`)
})

// Создание индексного файла для экспорта всех компонентов
const indexContent = generatedPages.map(page => 
  `export { ${page.componentName} } from './${page.componentName}'`
).join('\n')

fs.writeFileSync(path.join(pagesDir, 'index.ts'), indexContent)

// Создание файла с маршрутами для App.tsx
const routesContent = `// Автоматически сгенерированные маршруты для товаров
// Дата генерации: ${new Date().toISOString()}

// Импорты компонентов
${routes.map(route => route.import).join('\n')}

// Маршруты для добавления в App.tsx
export const PRODUCT_ROUTES = [
${routes.map(route => `  {
    path: "${route.path}",
    component: ${route.component}
  }`).join(',\n')}
]

// JSX элементы маршрутов для App.tsx
export const PRODUCT_ROUTE_ELEMENTS = [
${routes.map(route => `  <Route
    path="${route.path}"
    element={
      <ProtectedRoute requireAuth={false}>
        <AppShell padding="md">
          <AppShell.Main style={{ paddingBottom: '120px' }}>
            <${route.component} />
          </AppShell.Main>
          <TelegramBottomNav />
        </AppShell>
      </ProtectedRoute>
    }
  />`).join(',\n')}
]`

fs.writeFileSync(path.join(__dirname, '../src/pages/product-seo/productRoutes.tsx'), routesContent)

// Создание файла со списком URL для sitemap.xml
const sitemapUrls = generatedPages.map(page => `  <url>
    <loc>https://dimbopizza.ru${page.url}</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')

fs.writeFileSync(path.join(__dirname, '../sitemap-products.xml'), `<!-- Товарные SEO страницы -->
${sitemapUrls}`)

console.log(`\n🎉 ГЕНЕРАЦИЯ ЗАВЕРШЕНА!`)
console.log(`📊 Создано страниц: ${generatedPages.length}`)
console.log(`📁 Директория: ${pagesDir}`)
console.log(`🗂️ Индексный файл: ${path.join(pagesDir, 'index.ts')}`)
console.log(`🛣️ Маршруты: ${path.join(__dirname, '../src/pages/product-seo/productRoutes.tsx')}`)
console.log(`🗺️ Sitemap: ${path.join(__dirname, '../sitemap-products.xml')}`)

console.log(`\n📋 СОЗДАННЫЕ СТРАНИЦЫ:`)
generatedPages.forEach(page => {
  console.log(`   ${page.product} -> ${page.url}`)
})

console.log(`\n🔗 СЛЕДУЮЩИЕ ШАГИ:`)
console.log(`1. Добавить маршруты в App.tsx`)
console.log(`2. Обновить sitemap.xml`)
console.log(`3. Пересобрать проект`)
console.log(`4. Протестировать страницы`)
