/**
 * @file: generateKidsSEOPages.cjs
 * @description: Скрипт для автоматического создания детских SEO-страниц
 * @dependencies: Node.js fs module
 * @created: 2025-01-27
 */

const fs = require('fs')
const path = require('path')

// Детские ключевики
const KIDS_KEYWORDS = [
  'детский день рождения',
  'детский день рождения где',
  'где отметить детский день рождения',
  'детские аниматоры на день рождения',
  'меню на детский день рождения',
  'детский подарок на день рождения',
  'отпраздновать детский день рождения',
  'где отпраздновать детский день рождения',
  'где провести детский день рождения',
  'детский квест на день рождения',
  'детский день рождения лет',
  'празднование детского дня рождения',
  'отметить детский день рождения',
  'еда на детском дне рождения',
  'детский день рождения год',
  'праздник для детей',
  'где отметить др ребенка',
  'поздравление с рождением ребенка',
  'детские подарки',
  'что подарить ребенку',
  'подарок мальчику',
  'подарок девочке',
  'подарок дочке',
  'подарок подростку',
  'аниматоры на день рождения',
  'детский праздник',
  'праздники в детском саду',
  'сценарий детского праздника',
  'организация детских праздников',
  'проведение детских праздников',
  'организация детских праздников в волжске',
  'организация праздников и мероприятий в волжске',
  'детские аниматоры в волжске',
  'детские аниматоры на праздник волжск'
]

// Функция транслитерации (упрощенная версия)
function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    ' ': '-', '_': '-'
  }
  
  return text.toLowerCase().split('').map(char => map[char] || char).join('')
}

// Функция для создания компонента страницы
function createKidsPageComponent(keyword) {
  const cleanKeyword = transliterate(keyword)
    .replace(/[^a-zA-Z0-9]/g, '-')
    .split('-')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  
  const componentName = cleanKeyword + 'KidsPage'
    
  const fileName = transliterate(keyword.replace(/\s+/g, '-')) + '-kids-page'
  const url = transliterate(keyword.replace(/\s+/g, '-'))
  
  const pageContent = `/**
 * @file: ${componentName}.tsx
 * @description: SEO-страница для ключевика "${keyword}"
 * @dependencies: KidsPageTemplate
 * @created: 2025-01-27
 */

import React from 'react'
import { KidsPageTemplate } from '../../components/seo/KidsPageTemplate'

export const ${componentName}: React.FC = () => {
  return (
    <KidsPageTemplate 
      keyword="${keyword.replace(/"/g, '\\"')}"
      page="${url}"
    />
  )
}
`

  return {
    componentName,
    fileName,
    url,
    content: pageContent
  }
}

// Создание папки для детских SEO-страниц
const kidsDir = path.join(__dirname, '..', 'src', 'pages', 'kids-seo')
if (!fs.existsSync(kidsDir)) {
  fs.mkdirSync(kidsDir, { recursive: true })
}

// Создание компонентов для каждого ключевика
const createdPages = []

KIDS_KEYWORDS.forEach(keyword => {
  const { componentName, fileName, url, content } = createKidsPageComponent(keyword)
  
  const filePath = path.join(kidsDir, `${componentName}.tsx`)
  fs.writeFileSync(filePath, content)
  
  createdPages.push({
    componentName,
    fileName,
    url,
    keyword
  })
  
  console.log(`✅ Создана страница: ${componentName} -> /${url}`)
})

// Создание индексного файла для экспортов
const indexContent = `/**
 * @file: index.ts
 * @description: Экспорт всех детских SEO-страниц
 * @dependencies: Все детские SEO компоненты
 * @created: 2025-01-27
 */

${createdPages.map(page => `export { ${page.componentName} } from './${page.componentName}'`).join('\n')}
`

fs.writeFileSync(path.join(kidsDir, 'index.ts'), indexContent)

// Создание файла с маршрутами для App.tsx
const routesContent = `// Детские SEO маршруты для добавления в App.tsx
// Добавьте эти импорты в начало файла:
${createdPages.map(page => `import { ${page.componentName} } from './pages/kids-seo/${page.componentName}'`).join('\n')}

// Добавьте эти маршруты в раздел Routes:
${createdPages.map(page => `<Route path="/${page.url}" element={<ProtectedRoute requireAuth={false}><${page.componentName} /></ProtectedRoute>} />`).join('\n')}
`

fs.writeFileSync(path.join(__dirname, 'kids-routes.txt'), routesContent)

// Создание entries для sitemap.xml
const sitemapEntries = createdPages.map(page => `  <url>
    <loc>https://dimbopizza.ru/${page.url}</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')

fs.writeFileSync(path.join(__dirname, 'kids-sitemap-entries.txt'), sitemapEntries)

// Создание записей для robots.txt
const robotsEntries = createdPages.map(page => `Allow: /${page.url}`).join('\n')

fs.writeFileSync(path.join(__dirname, 'kids-robots-entries.txt'), robotsEntries)

console.log(`\n🎉 УСПЕШНО СОЗДАНО ${createdPages.length} ДЕТСКИХ SEO-СТРАНИЦ!\n`)
console.log('📁 Файлы созданы в: src/pages/kids-seo/')
console.log('📄 Маршруты: scripts/kids-routes.txt')
console.log('🗺️  Sitemap: scripts/kids-sitemap-entries.txt')
console.log('🤖 Robots: scripts/kids-robots-entries.txt')
console.log('\n📋 СПИСОК СОЗДАННЫХ СТРАНИЦ:')
createdPages.forEach((page, index) => {
  console.log(`${index + 1}. /${page.url} - "${page.keyword}"`)
})
console.log(`\n✨ Всего страниц: ${createdPages.length}`)
