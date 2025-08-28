const fs = require('fs');
const path = require('path');

// Функция транслитерации
function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ь': '', 'ы': 'y', 'ъ': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ь': '', 'Ы': 'Y', 'Ъ': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };
  
  return text.split('').map(char => map[char] || char).join('');
}

// Список всех детских ключевых слов для Зеленодольска
const zelenodolskKidsKeywords = [
  // ДЕНЬ РОЖДЕНИЯ (8 страниц)
  'детский день рождения зеленодольск',
  'детский день рождения где зеленодольск', 
  'где отметить детский день рождения зеленодольск',
  'отпраздновать детский день рождения зеленодольск',
  'где отпраздновать детский день рождения зеленодольск',
  'где провести детский день рождения зеленодольск',
  'празднование детского дня рождения зеленодольск',
  'отметить детский день рождения зеленодольск',

  // АНИМАТОРЫ (4 страницы)
  'детские аниматоры на день рождения зеленодольск',
  'аниматоры на день рождения зеленодольск',
  'детские аниматоры в зеленодольске',
  'детские аниматоры на праздник зеленодольск',

  // МЕНЮ И ЕДА (2 страницы)
  'меню на детский день рождения зеленодольск',
  'еда на детском дне рождения зеленодольск',

  // ПОДАРКИ (7 страниц)
  'детский подарок на день рождения зеленодольск',
  'детские подарки зеленодольск',
  'что подарить ребенку зеленодольск',
  'подарок мальчику зеленодольск',
  'подарок девочке зеленодольск',
  'подарок дочке зеленодольск',
  'подарок подростку зеленодольск',

  // КВЕСТЫ И РАЗВЛЕЧЕНИЯ (3 страницы)
  'детский квест на день рождения зеленодольск',
  'праздник для детей зеленодольск',
  'детский праздник зеленодольск',

  // ВОЗРАСТНЫЕ ГРУППЫ (3 страницы)
  'детский день рождения лет зеленодольск',
  'детский день рождения год зеленодольск',
  'где отметить др ребенка зеленодольск',

  // ОРГАНИЗАЦИЯ ПРАЗДНИКОВ (6 страниц)
  'организация детских праздников зеленодольск',
  'проведение детских праздников зеленодольск',
  'организация детских праздников в зеленодольске',
  'организация праздников и мероприятий в зеленодольске',
  'праздники в детском саду зеленодольск',
  'сценарий детского праздника зеленодольск',

  // ПОЗДРАВЛЕНИЯ (1 страница)
  'поздравление с рождением ребенка зеленодольск'
];

function createZelenodolskKidsPageComponent(keyword) {
  // Создаем URL без слова "зеленодольск"
  const baseKeyword = keyword.replace(' зеленодольск', '').replace(' в зеленодольске', '');
  const cleanKeyword = transliterate(baseKeyword)
    .replace(/[^a-zA-Z0-9]/g, '-')
    .split('-')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const componentName = cleanKeyword + 'ZelenodolskKidsPage';
  
  // URL с добавлением -zelenodolsk
  const urlKeyword = transliterate(baseKeyword)
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  const url = `/${urlKeyword}-zelenodolsk`;

  const componentContent = `/**
 * @file: ${componentName}.tsx
 * @description: SEO-страница для "${keyword}"
 * @dependencies: KidsPageTemplate, SEO utils
 * @created: ${new Date().toISOString().split('T')[0]}
 */

import React from 'react'
import { KidsPageTemplate } from '../../components/seo/KidsPageTemplate'

const ${componentName}: React.FC = () => {
  return (
    <KidsPageTemplate 
      keyword="${keyword}"
      city="Зеленодольск"
    />
  )
}

export default ${componentName}`;

  // Записываем файл
  const filePath = path.join(__dirname, '../src/pages/zelenodolsk-kids-seo', `${componentName}.tsx`);
  fs.writeFileSync(filePath, componentContent);
  
  console.log(`✅ Создан компонент: ${componentName}`);
  
  return {
    componentName,
    keyword,
    url,
    fileName: `${componentName}.tsx`
  };
}

// Создаем все компоненты
console.log('🚀 Создание Зеленодольских детских SEO-страниц...\n');

const results = zelenodolskKidsKeywords.map(createZelenodolskKidsPageComponent);

// Создаем файл экспортов
const indexContent = `/**
 * @file: index.ts  
 * @description: Экспорт всех Зеленодольских детских SEO-страниц
 * @created: ${new Date().toISOString().split('T')[0]}
 */

${results.map(({ componentName, fileName }) => 
  `export { default as ${componentName} } from './${fileName.replace('.tsx', '')}'`
).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../src/pages/zelenodolsk-kids-seo/index.ts'), indexContent);

// Создаем файл с маршрутами
const routesContent = results.map(({ componentName, url }) => 
  `<Route path="${url}" element={<ProtectedRoute requireAuth={false}><AppShell padding="md"><AppShell.Main style={{ paddingBottom: '120px' }}><${componentName} /></AppShell.Main><TelegramBottomNav /></AppShell></ProtectedRoute>} />`
).join('\n');

fs.writeFileSync(path.join(__dirname, 'zelenodolsk-kids-routes.txt'), routesContent);

// Создаем записи для sitemap
const sitemapEntries = results.map(({ url }) => `  <url>
    <loc>https://dimbopizza.ru${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

fs.writeFileSync(path.join(__dirname, 'zelenodolsk-kids-sitemap-entries.txt'), sitemapEntries);

// Создаем записи для robots.txt
const robotsEntries = results.map(({ url }) => `Allow: ${url}`).join('\n');
fs.writeFileSync(path.join(__dirname, 'zelenodolsk-kids-robots-entries.txt'), robotsEntries);

console.log(`\n🎉 ЗЕЛЕНОДОЛЬСКИЕ ДЕТСКИЕ SEO-СТРАНИЦЫ СОЗДАНЫ!`);
console.log(`📊 Всего создано: ${results.length} страниц`);
console.log(`📁 Папка: src/pages/zelenodolsk-kids-seo/`);
console.log(`📄 Файлы: zelenodolsk-kids-routes.txt, zelenodolsk-kids-sitemap-entries.txt, zelenodolsk-kids-robots-entries.txt`);
console.log(`\n🔗 Примеры URL:`);
results.slice(0, 5).forEach(({ url, keyword }) => {
  console.log(`   ${url} - ${keyword}`);
});
if (results.length > 5) {
  console.log(`   ... и еще ${results.length - 5} страниц`);
}
