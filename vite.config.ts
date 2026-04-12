import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Prerendering — раскомментируйте когда Chrome/Puppeteer установлен
// import prerender from '@prerenderer/rollup-plugin'

// Все маршруты для prerendering (SEO-страницы + основные страницы)
const PRERENDER_ROUTES = [
  '/',
  '/auth',
  '/privacy',
  '/dimbokids',
  '/dostavka-pizzy',
  '/zakazat-pizzu',
  '/dostavka-shashlyka',
  '/zakazat-shashlyk',
  '/dostavka-sushi',
  '/zakazat-sushi',
  '/dostavka-burgerov',
  '/zakazat-burgery',
  '/dostavka-krylyshek',
  '/zakazat-krylyshki',
  '/dostavka-kartoshki-fri',
  '/zakazat-kartoshku-fri',
  '/dostavka-edy-volzhsk',
  '/zakazat-edu-volzhsk',
  '/pitstsa-zakazat-s-dostavkoy',
  '/pizzeriya-volzhsk',
  '/pizzeriya-lenina',
  '/gde-zakazat-pitstsu',
  '/eda-na-zakaz',
  '/dodo-pizza-volzhsk',
  '/podslushano-volzhsk',
  '/volzhsk-24',
  // Индивидуальные продукты
  '/pitstsa-margarita', '/gribnaya-pitstsa', '/gavayskaya-pitstsa', '/myasnaya-pitstsa',
  '/pitstsa-morskaya', '/pitstsa-salyami', '/pitstsa-pepperoni', '/pitstsa-tsezar',
  '/domashnyaya-pitstsa', '/syrnaya-pitstsa',
  '/burger-dimburger', '/burger-chikenburger', '/burger-chizburger', '/burger-dzhunior',
  '/kartofel-fri-100-gr', '/kartofel-fri-150-gr',
  '/nagetsy-6-shtuk', '/nagetsy-9-shtuk', '/nagetsy-12-shtuk',
  '/krylya-6-shtuk', '/krylya-9-shtuk',
  '/zakrytaya-pitstsa-klassicheskaya', '/zakrytaya-pitstsa-okhotnichya',
  '/zakrytaya-pitstsa-kurinaya', '/zakrytaya-pitstsa-syrnaya', '/zakrytaya-pitstsa-gavayskaya',
  // Kids Волжск
  '/detskiy-denь-rozhdeniya', '/detskiy-denь-rozhdeniya-gde', '/gde-otmetitь-detskiy-denь-rozhdeniya',
  '/detskie-animatory-na-denь-rozhdeniya', '/menyu-na-detskiy-denь-rozhdeniya',
  '/detskiy-podarok-na-denь-rozhdeniya', '/otprazdnovatь-detskiy-denь-rozhdeniya',
  '/gde-otprazdnovatь-detskiy-denь-rozhdeniya', '/gde-provesti-detskiy-denь-rozhdeniya',
  '/detskiy-kvest-na-denь-rozhdeniya', '/detskiy-denь-rozhdeniya-let',
  '/prazdnovanie-detskogo-dnya-rozhdeniya', '/otmetitь-detskiy-denь-rozhdeniya',
  '/eda-na-detskom-dne-rozhdeniya', '/detskiy-denь-rozhdeniya-god',
  '/prazdnik-dlya-detey', '/gde-otmetitь-dr-rebenka', '/pozdravlenie-s-rozhdeniem-rebenka',
  '/detskie-podarki', '/chto-podaritь-rebenku', '/podarok-malьchiku',
  '/podarok-devochke', '/podarok-dochke', '/podarok-podrostku',
  '/animatory-na-denь-rozhdeniya', '/detskiy-prazdnik', '/prazdniki-v-detskom-sadu',
  '/stsenariy-detskogo-prazdnika', '/organizatsiya-detskih-prazdnikov',
  '/provedenie-detskih-prazdnikov', '/organizatsiya-detskih-prazdnikov-v-volzhske',
  '/organizatsiya-prazdnikov-i-meropriyatiy-v-volzhske',
  '/detskie-animatory-v-volzhske', '/detskie-animatory-na-prazdnik-volzhsk',
  // Kids Зеленодольск
  '/detskiy-den-rozhdeniya-zelenodolsk', '/detskiy-den-rozhdeniya-gde-zelenodolsk',
  '/gde-otmetit-detskiy-den-rozhdeniya-zelenodolsk',
  '/otprazdnovat-detskiy-den-rozhdeniya-zelenodolsk',
  '/gde-otprazdnovat-detskiy-den-rozhdeniya-zelenodolsk',
  '/gde-provesti-detskiy-den-rozhdeniya-zelenodolsk',
  '/prazdnovanie-detskogo-dnya-rozhdeniya-zelenodolsk',
  '/otmetit-detskiy-den-rozhdeniya-zelenodolsk',
  '/detskie-animatory-na-den-rozhdeniya-zelenodolsk',
  '/animatory-na-den-rozhdeniya-zelenodolsk',
  '/detskie-animatory-ve-zelenodolsk', '/detskie-animatory-na-prazdnik-zelenodolsk',
  '/menyu-na-detskiy-den-rozhdeniya-zelenodolsk',
  '/eda-na-detskom-dne-rozhdeniya-zelenodolsk',
  '/detskiy-podarok-na-den-rozhdeniya-zelenodolsk',
  '/detskie-podarki-zelenodolsk', '/chto-podarit-rebenku-zelenodolsk',
  '/podarok-malchiku-zelenodolsk', '/podarok-devochke-zelenodolsk',
  '/podarok-dochke-zelenodolsk', '/podarok-podrostku-zelenodolsk',
  '/detskiy-kvest-na-den-rozhdeniya-zelenodolsk',
  '/prazdnik-dlya-detey-zelenodolsk', '/detskiy-prazdnik-zelenodolsk',
  '/detskiy-den-rozhdeniya-let-zelenodolsk', '/detskiy-den-rozhdeniya-god-zelenodolsk',
  '/gde-otmetit-dr-rebenka-zelenodolsk',
  '/organizatsiya-detskikh-prazdnikov-zelenodolsk',
  '/provedenie-detskikh-prazdnikov-zelenodolsk',
  '/organizatsiya-detskikh-prazdnikov-ve-zelenodolsk',
  '/organizatsiya-prazdnikov-i-meropriyatiy-ve-zelenodolsk',
  '/prazdniki-v-detskom-sadu-zelenodolsk', '/stsenariy-detskogo-prazdnika-zelenodolsk',
  '/pozdravlenie-s-rozhdeniem-rebenka-zelenodolsk',
  // Зеленодольск доставка
  '/dostavka-pizzy-zelenodolsk', '/zakazat-pizzu-zelenodolsk',
  '/dostavka-shashlyka-zelenodolsk', '/zakazat-shashlyk-zelenodolsk',
  '/dostavka-sushi-zelenodolsk', '/zakazat-sushi-zelenodolsk',
  '/dostavka-burgerov-zelenodolsk', '/zakazat-burgery-zelenodolsk',
  '/dostavka-krylyshek-zelenodolsk', '/zakazat-krylyshki-zelenodolsk',
  '/dostavka-kartoshki-fri-zelenodolsk', '/zakazat-kartoshku-fri-zelenodolsk',
  '/dostavka-edy-zelenodolsk', '/zakazat-edu-zelenodolsk',
  '/dostavka-nagetsov-zelenodolsk', '/zakazat-nagetsy-zelenodolsk',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Prerendering — включить когда Chrome/Puppeteer настроен
    // prerender({
    //   routes: PRERENDER_ROUTES,
    //   renderer: '@prerenderer/renderer-puppeteer',
    //   rendererOptions: { renderAfterTime: 3000, headless: true, args: ['--no-sandbox'] },
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mantine': ['@mantine/core', '@mantine/hooks'],
          'vendor-query': ['@tanstack/react-query'],
        }
      }
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      port: 5174,
      host: '0.0.0.0',
      clientPort: 5174
    },
    proxy: {
      '/api': {
        target: 'https://api.dimbopizza.ru',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
