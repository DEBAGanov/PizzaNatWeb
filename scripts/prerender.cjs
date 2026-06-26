/**
 * @file: prerender.cjs
 * @description: Пост-сборочный пререндер SEO-маршрутов в статический HTML.
 *
 * Запускает наш же собранный SPA в headless-Chromium, ждёт отработки JS
 * (мета/canonical/schema проставляются в рантайме после фиксов P0/P1) и
 * сохраняет dist/<route>/index.html. nginx (try_files $uri $uri/ /index.html)
 * отдаёт эти файлы ботам без JS.
 *
 * БЕЗОПАСНОСТЬ ДЕПЛОЯ: скрипт НЕ-ФАТАЛЬНЫЙ — при любой ошибке (OOM на 1GB,
 * отсутствие Chromium, недоступность API) он логирует и выходит с кодом 0,
 * поэтому Docker-сборка всё равно отдаёт рабочий SPA (как было до пререндера).
 *
 * Использует СИСТЕМНЫЙ Chromium через PUPPETEER_EXECUTABLE_PATH (в Docker —
 * /usr/bin/chromium-browser), Chromium при npm ci не скачивается.
 */
const fs = require('fs')
const path = require('path')
const Prerenderer = require('@prerenderer/prerenderer')
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')
const routes = require('./prerender-routes.cjs')

const DIST = path.join(__dirname, '..', 'dist')

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.warn('[prerender] dist/index.html не найден — пропускаю (non-fatal)')
    return
  }

  const prerenderer = new Prerenderer({
    staticDir: DIST,
    renderer: new PuppeteerRenderer({
      renderAfterTime: 3000,
      maxConcurrentRoutes: 1, // 1GB RAM — рендерим по одной странице
      headless: true,
      launchOptions: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--single-process',
          '--no-zygote',
        ],
      },
    }),
  })

  await prerenderer.initialize()

  let ok = 0
  let fail = 0
  for (const route of routes) {
    try {
      const rendered = await prerenderer.renderRoutes([route])
      const item = rendered && rendered[0]
      if (!item || !item.html) {
        fail++
        continue
      }
      const outDir = route === '/' ? DIST : path.join(DIST, route.replace(/^\//, ''))
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), item.html.trim())
      ok++
      if (ok % 20 === 0) console.log(`[prerender] ${ok}/${routes.length}…`)
    } catch (e) {
      fail++
      console.warn('[prerender] пропуск', route, '-', (e && e.message) || e)
    }
  }

  console.log(`[prerender] готово: ${ok} ок, ${fail} ошибок из ${routes.length}`)
  await prerenderer.destroy()
}

main()
  .catch((e) => {
    console.warn('[prerender] отключён (non-fatal):', (e && e.message) || e)
  })
  .finally(() => process.exit(0)) // никогда не валим Docker-сборку
