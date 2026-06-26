/**
 * Список маршрутов для пререндера — единый источник правды: public/sitemap.xml.
 * Берём только пути этого домена (внешние ссылки игнорируем), дедуплицируем.
 */
const fs = require('fs')
const path = require('path')

function getRoutes() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  if (!fs.existsSync(sitemapPath)) return ['/']
  const xml = fs.readFileSync(sitemapPath, 'utf8')
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1])
  const routes = locs
    .filter((u) => /^https?:\/\/dimbopizza\.ru/i.test(u))
    .map((u) => {
      try {
        return new URL(u).pathname
      } catch {
        return null
      }
    })
    .filter(Boolean)
  // уникальные; '/' рендерим последним, чтобы не перетереть shell index.html в процессе
  const unique = [...new Set(routes)]
  return unique.sort((a, b) => (a === '/' ? 1 : b === '/' ? -1 : 0))
}

module.exports = getRoutes()
