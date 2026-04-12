# SEO Стратегия ДИМБО Пицца — Волжск + Зеленодольск

> Последнее обновление: 12.04.2026
> Сайт: https://dimbopizza.ru (9 месяцев)
> Sitemap: https://dimbopizza.ru/sitemap.xml
> Robots: https://dimbopizza.ru/robots.txt

---

## 1. Выполненные работы

### 1.1 Аудит и диагностика (12.04.2026)

**Яндекс.Вебмастер (реальные данные):**
- 130+ страниц в sitemap
- **80 страниц** проиндексировано (61%)
- **71 из 80 (88%)** имеют одинаковый title — Яндекс не рендерит JS
- Из ~35 Зеленодольских kids-страниц проиндексирована только 1
- Только 3 страницы с уникальным title: /, /dimbokids, /auth

**Google Search Console:**
- 63 страницы «Просканирована, но не проиндексирована»
- 7 страниц с canonical variant
- 3 страницы 404

**PageSpeed Insights (мобильные):**
- Performance: **58/100** (цель 90+)
- LCP: **6.8 сек** (цель < 2.5 сек)
- Размер страницы: **12.5 МБ**

### 1.2 Технические исправления (12.04.2026)

| Исправление | Файл | Статус |
|-------------|------|--------|
| manifest.json → брендовый | `index.html` | DONE |
| Координаты Волжска 56.1194/47.8681 | `schemaOrg.ts` | DONE |
| loading="lazy" на все картинки | `OptimizedImage.tsx` | DONE |
| Даты в sitemap.xml обновлены | `sitemap.xml` | DONE |
| Dockerfile nginx permissions | `Dockerfile` | DONE |

### 1.3 Code Splitting (12.04.2026)

| Метрика | До | После |
|---------|-----|-------|
| Основной бандл | 1,242 KB | 543 KB (-56%) |
| Vendor чанки | — | React 48 KB + Mantine 298 KB |
| SEO-страницы | в основном бандле | отдельные чанки 1-19 KB |
| Всего чанков | 3 | 50+ |

### 1.4 Страницы Зеленодольска — доставка (12.04.2026)

Создано **16 SEO-страниц** доставки из Волжска в Зеленодольск:

| Категория | Страницы |
|-----------|----------|
| Пицца | /dostavka-pizzy-zelenodolsk, /zakazat-pizzu-zelenodolsk |
| Шашлык | /dostavka-shashlyka-zelenodolsk, /zakazat-shashlyk-zelenodolsk |
| Суши | /dostavka-sushi-zelenodolsk, /zakazat-sushi-zelenodolsk |
| Бургеры | /dostavka-burgerov-zelenodolsk, /zakazat-burgery-zelenodolsk |
| Крылышки | /dostavka-krylyshek-zelenodolsk, /zakazat-krylyshki-zelenodolsk |
| Картошка фри | /dostavka-kartoshki-fri-zelenodolsk, /zakazat-kartoshku-fri-zelenodolsk |
| Еда | /dostavka-edy-zelenodolsk, /zakazat-edu-zelenodolsk |
| Нагетсы | /dostavka-nagetsov-zelenodolsk, /zakazat-nagetsy-zelenodolsk |

Новые файлы:
- `src/components/seo/CityDeliverySEOTemplate.tsx` — шаблон
- `src/data/zelenodolskDeliveryData.ts` — данные
- `src/pages/zelenodolsk-delivery-seo/` — 16 страниц
- Обновлены: `App.tsx`, `robots.txt`, `sitemap.xml`

### 1.5 Prerendering (настроен, требует активации)

- Плагин установлен: `@prerenderer/rollup-plugin`
- Конфигурация в `vite.config.ts` (закомментирована)
- 150+ маршрутов для prerendering
- **Требует**: Chrome/Puppeteer на сервере сборки
- Для активации: раскомментировать блок в `vite.config.ts`

### 1.6 Масштабирование SEO — 113 новых страниц (12.04.2026)

**Реализовано**: 113 SEO-страниц в 6 категориях с data-driven архитектурой.

#### Архитектура

| Компонент | Файл | Описание |
|-----------|------|----------|
| Генератор маршрутов | `src/utils/routeGenerator.tsx` | `generateSEORoutes()` — заменяет боилерплейт |
| Шаблон блога | `src/components/seo/BlogArticleTemplate.tsx` | Статьи с FAQ, похожими статьями, Schema.org Article |
| Шаблон сезонных | `src/components/seo/SeasonalPageTemplate.tsx` | Мероприятия с меню, мастер-классами, Schema.org Event |
| Шаблон продукт×город | `src/components/seo/ProductCityTemplate.tsx` | 26 товаров × 2 города, городская специфика |
| Шаблон кейтеринга | `src/components/seo/CateringTemplate.tsx` | B2B пакеты меню с ценами, Schema.org Service |
| Шаблон отзывов | `src/components/seo/ReviewsPageTemplate.tsx` | Рейтинги, бейдж награды «Хорошее место 2026» |
| FAQ данные | `src/data/faqData.ts` | Бургеры, нагетсы, кейтеринг, отзывы, мастер-классы |

#### Блог — 30 статей

**Данные**: `src/data/blogData.ts`
**Страницы**: `src/pages/blog/Blog0.tsx` — `Blog29.tsx`
**Маршруты**: `src/routes/blogRoutes.ts`
**Шаблон**: BlogArticleTemplate (Hero + статья + FAQ + похожие статьи + CTA)

| # | Категория | Статья | Slug |
|---|-----------|--------|------|
| 1 | Рецепты | Как приготовить пиццу дома | /kak-prigotovit-pitstsu-doma |
| 2 | Рецепты | Рецепт бургера как в ресторане | /retsept-burgera-kak-v-restorane |
| 3 | Рецепты | Суши дома — проще чем кажется | /sushi-doma-proshche-chem-kazhetsya |
| 4 | Рецепты | Домашняя пицца на тонком тесте | /domashnyaya-pitstsa-na-tonkom-teste |
| 5 | Рецепты | Идеальный шашлык — секреты маринада | /idealnyy-shashlyk-sekrety-marinada |
| 6 | Рецепты | Роллы Филадельфия дома | /rolly-filadelfiya-doma |
| 7 | Рецепты | Картошка фри как в ресторане | /kartoshka-fri-kak-v-restorane |
| 8 | Советы | Как правильно разогреть пиццу | /kak-pravilno-razogret-pitstsu |
| 9 | Советы | Как выбрать пиццерию для доставки | /kak-vybrat-pitstseriyu-dlya-dostavki |
| 10 | Советы | Сколько пиццы заказать на компанию | /skolko-pitstsy-zakazat-na-kompaniyu |
| 11 | Советы | Еда для вечеринки — что заказать | /eda-dlya-vecherinki-chto-zakazat |
| 12 | Гайды | Виды итальянской пиццы — полный гид | /vidy-italyanskoy-pitstsy-polnyy-gid |
| 13 | Гайды | Лучшие начинки для пиццы — топ-10 | /luchshie-nachinki-dlya-pitstsy-top-10 |
| 14 | Гайды | Шашлык из свинины vs курицы | /shashlyk-iz-svininy-vs-kuritsy |
| 15 | Гайды | Бургеры — какие бывают виды | /burgery-kakie-byvayut-vidy |
| 16 | Ресторан | История ДИМБО Пицца | /istoriya-dimbo-pitstsa |
| 17 | Ресторан | Мастер-классы ДИМБО | /master-klassy-dimbo |
| 18 | Ресторан | Наши ингредиенты — качество | /nashi-ingrediyenty-kachestvo |
| 19 | Локальное | Еда в Волжске — гастрономический гид | /eda-v-volzhske-gastronomicheskiy-gid |
| 20 | Локальное | Кухня народов Марий Эл | /kuhnya-narodov-mariy-el |
| 21 | Локальное | Где поесть в Волжске — обзор | /gde-poest-v-volzhske-obzor |
| 22 | Сезонное | Летнее меню — что заказать в жару | /letnee-menyu-chto-zakazat-v-zharu |
| 23 | Сезонное | Зимняя еда — согревающие блюда | /zimnyaya-eda-sogrevayushchie-blyuda |
| 24 | Сезонное | Праздничный стол — что заказать | /prazdnichnyy-stol-chto-zakazat |
| 25 | Сравнения | Пицца vs бургер — что выбрать | /pitstsa-vs-burger-chto-vybrat |
| 26 | Сравнения | Доставка еды vs поход в ресторан | /dostavka-edy-vs-pohod-v-restoran |
| 27 | Сравнения | Домашняя пицца vs доставка | /domashnyaya-pitstsa-vs-dostavka |
| 28 | Здоровье | Калории в популярных блюдах | /kalorii-v-populyarnyh-blyudah |
| 29 | Здоровье | Сбалансированный обед с доставкой | /sbalansirovannyy-obed-s-dostavkoy |
| 30 | Здоровье | Вегетарианская пицца — польза и вкус | /vegetarianskaya-pitstsa-polza-i-vkus |

#### Сезонные страницы — 15 мероприятий

**Данные**: `src/data/seasonalData.ts`
**Страницы**: `src/pages/seasonal/Seasonal0.tsx` — `Seasonal14.tsx`
**Маршруты**: `src/routes/seasonalRoutes.ts`
**Шаблон**: SeasonalPageTemplate (Hero + контент + меню + промо мастер-классов + FAQ + CTA)

| # | Мероприятие | Slug |
|---|-------------|------|
| 1 | Новогодний стол — доставка | /novogodniy-stol-dostavka |
| 2 | Заказать еду на Новый год | /zakazat-edy-na-novyy-god |
| 3 | Доставка еды на 8 Марта | /dostavka-edy-na-8-marta |
| 4 | Доставка еды на день рождения | /dostavka-edy-na-den-rozhdeniya |
| 5 | Корпоративная доставка еды | /korporativnaya-dostavka-edy |
| 6 | Доставка еды на пикник | /dostavka-edy-na-piknik |
| 7 | Свадебная доставка еды | /svadebnaya-dostavka-edy |
| 8 | Доставка еды на выпускной | /dostavka-edy-na-vypusknoy |
| 9 | Доставка еды 1 сентября | /dostavka-edy-1-sentyabrya |
| 10 | Доставка еды на День России | /dostavka-edy-na-den-rossii |
| 11 | Доставка еды День Победы | /dostavka-edy-den-pobedy |
| 12 | Рождественский стол — доставка | /rozhdestvenskiy-stol-dostavka |
| 13 | Доставка еды День матери | /dostavka-edy-den-materi |
| 14 | Масленица — доставка еды | /maslenitsa-dostavka-edy |
| 15 | Доставка еды на дом | /dostavka-edy-na-dom |

#### Мастер-классы — 2 страницы

**Страницы**: `src/pages/masterclass/`
**Маршруты**: `src/routes/masterclassRoutes.ts`
**Шаблон**: SeasonalPageTemplate (с masterclassInfo + фото)

| Slug | Название |
|------|----------|
| /master-klass-po-prigotovleniyu-pitstsy | Мастер-класс по приготовлению пиццы |
| /master-klass-po-prigotovleniyu-burgerov | Мастер-класс по приготовлению бургеров |

Фото: `/images/kids/masterclass-1..8.jpg`
Частота: 1-2 раза в месяц

#### Продукт × Город — 52 страницы

**Данные**: `src/data/productCityData.ts` (генерируется из PRODUCTS_DATA)
**Страницы**: `src/pages/product-city/ProductVolzhsk0-25.tsx`, `ProductZelenodolsk0-25.tsx`
**Маршруты**: `src/routes/productCityRoutes.ts`
**Шаблон**: ProductCityTemplate (с городской спецификой доставки)

26 товаров × 2 города = 52 страницы. Slug формат: `/product-volzhsk-{id}`, `/product-zelenodolsk-{id}`

Для Зеленодольска: «доставка из Волжска», от 1200₽, 60-90 мин
Для Волжска: стандартная доставка, от 800₽, 30-60 мин

Товары: пиццы (Мargarita, Грибная, Гавайская, Мясная, Морская, Салями, Пепперони, Цезарь, Домашняя, Сырная), бургеры (ДИМБО, Чикенбургер, Чизбургер, Джуниор), картофель фри (100г, 150г), нагетсы (6/9/12 шт), крылышки (6/9 шт), закрытые пиццы (5 видов)

#### Кейтеринг — 10 страниц B2B

**Данные**: `src/data/cateringData.ts`
**Страницы**: `src/pages/catering/` (10 файлов)
**Маршруты**: `src/routes/cateringRoutes.ts`
**Шаблон**: CateringTemplate (пакеты меню с ценами + шаги заказа + FAQ)

| Slug | Название |
|------|----------|
| /ketering-dlya-ofisa | Кейтеринг для офиса |
| /korporativnoe-pitanie | Корпоративное питание |
| /banketnoe-menyu | Банкетное меню |
| /svadebnyy-ketering | Свадебный кейтеринг |
| /piknik-dostavka | Пикник — доставка |
| /furshetnaya-dostavka | Фуршетная доставка |
| /detskiy-prazdnik-ketering | Детский праздник — кейтеринг |
| /dostavka-obedov-v-ofis | Доставка обедов в офис |
| /ketering-volzhsk | Кейтеринг Волжск |
| /ketering-zelenodolsk | Кейтеринг Зеленодольск |

#### Отзывы — 4 страницы

**Данные**: `src/data/reviewsData.ts`
**Страницы**: `src/pages/reviews/` (4 файла)
**Маршруты**: `src/routes/reviewRoutes.ts`
**Шаблон**: ReviewsPageTemplate (рейтинг + бейдж награды + виджет Яндекс Карт)

| Slug | Название | Награда |
|------|----------|---------|
| /otzyvy-dimbo-pizza-volzhsk | Отзывы ДИМБО Пицца Волжск | «Хорошее место 2026» |
| /otzyvy-dimbo-pizza-zelenodolsk | Отзывы ДИМБО Пицца Зеленодольск | — |
| /reyting-pitstserii-volzhsk | Рейтинг пиццерии Волжск | — |
| /luchshie-otzyvy-dimbo | Лучшие отзывы ДИМБО | — |

Отзывы на Яндекс Картах: https://yandex.ru/maps/org/dimbo/188302222909/reviews/

#### Schema.org обновления

**Файл**: `src/utils/schemaOrg.ts`

| Добавлено | Описание |
|-----------|----------|
| `generateArticleSchema()` | Для блог-статей |
| `generateEventSchema()` | Для сезонных страниц и мастер-классов |
| `generateServiceSchema()` | Для кейтеринга |
| `award` в Restaurant | «Хорошее место 2026 — Яндекс Карты» |
| `pageType: 'nuggets'` | Для страниц нагетсов |

#### Обновлённые SEO-файлы

| Файл | URL | Было | Стало |
|------|-----|------|-------|
| sitemap.xml | https://dimbopizza.ru/sitemap.xml | 153 URL, 991 строка | **266 URL, 1684 строки** |
| robots.txt | https://dimbopizza.ru/robots.txt | 111 Allow | **172 Allow (+61)** |

Новые Allow-директивы в robots.txt:
- Блог: 30 записей
- Сезонные: 15 записей
- Мастер-классы: 2 записи
- Кейтеринг: 10 записей
- Отзывы: 4 записи
- Продукт×город: покрываются `Allow: /`

#### Интеграция в App.tsx

Все 113 маршрутов подключены через `generateSEORoutes()`:
```tsx
import { generateSEORoutes } from './utils/routeGenerator'
import { blogRoutes } from './routes/blogRoutes'
import { seasonalRoutes } from './routes/seasonalRoutes'
import { productCityRoutes } from './routes/productCityRoutes'
import { cateringRoutes } from './routes/cateringRoutes'
import { reviewRoutes } from './routes/reviewRoutes'
import { masterclassRoutes } from './routes/masterclassRoutes'

// В Routes:
{...generateSEORoutes(blogRoutes)}
{...generateSEORoutes(seasonalRoutes)}
{...generateSEORoutes(productCityRoutes)}
{...generateSEORoutes(cateringRoutes)}
{...generateSEORoutes(reviewRoutes)}
{...generateSEORoutes(masterclassRoutes)}
```

Все страницы загружаются через `React.lazy()` — код не входит в основной бандл.

---

## 2. Текущее покрытие страницами

### Волжск (база)
| Тип | Кол-во | Примеры URL |
|-----|--------|-------------|
| Основные | 5 | /, /menu, /dimbokids, /auth, /privacy |
| Категории доставки | 18 | /dostavka-pizzy, /zakazat-sushi... |
| Короткие кириллические | 10 | /пицца, /суши, /бургеры... |
| Специфические запросы | 8 | /pizzeriya-volzhsk, /dodo-pizza-volzhsk... |
| Продукты (индивидуальные) | 26 | /pitstsa-margarita, /burger-dimburger... |
| Kids | 34 | /detskiy-den-rozhdeniya... |
| Блог | 30 | /kak-prigotovit-pitstsu-doma... |
| Сезонные | 15 | /novogodniy-stol-dostavka... |
| Мастер-классы | 2 | /master-klass-po-prigotovleniyu-pitstsy... |
| Продукт×город (Волжск) | 26 | /product-volzhsk-1... |
| Кейтеринг (Волжск) | 1 | /ketering-volzhsk |
| Отзывы (Волжск) | 2 | /otzyvy-dimbo-pizza-volzhsk, /reyting-pitstserii-volzhsk |
| **Итого Волжск** | **~177** | |

### Зеленодольск
| Тип | Кол-во | Примеры URL |
|-----|--------|-------------|
| Kids | 34 | /detskiy-den-rozhdeniya-zelenodolsk... |
| Доставка еды | 16 | /dostavka-pizzy-zelenodolsk... |
| Продукт×город (Зеленодольск) | 26 | /product-zelenodolsk-1... |
| Кейтеринг (Зеленодольск) | 1 | /ketering-zelenodolsk |
| Отзывы (Зеленодольск) | 1 | /otzyvy-dimbo-pizza-zelenodolsk |
| **Итого Зеленодольск** | **~78** | |

### Общий кейтеринг
| Тип | Кол-во |
|-----|--------|
| Общие страницы | 8 |

### Общий отзывы/рейтинг
| Тип | Кол-во |
|-----|--------|
| Общие страницы | 1 |

### Общий итог: ~266 URL (266 в sitemap)

### Бандл после масштабирования

| Метрика | Значение |
|---------|----------|
| Основной бандл | 652 KB |
| Время сборки | 7.4 сек |
| Всего чанков | 50+ |
| SEO-страницы | lazy-loaded, 1-19 KB каждая |

---

## 3. ПЛАН МАСШТАБИРОВАНИЯ: Выход в ТОП-5

### Цель: ТОП-5 по направлениям доставки еды в Волжске и Зеленодольске

### 3.1 Приоритетные направления для масштабирования

#### НАПРАВЛЕНИЕ А: Пиццерия (самое конкурентное)

**Целевые запросы ТОП-5:**
```
пиццерия волжск                  — ~800 запросов/мес
пиццерия волжск доставка          — ~400
пиццерия на ленина волжск         — ~200
пиццерия зеленодольск             — ~300
лучшая пиццерия в волжске         — ~150
пиццерия рядом со мной            — ~500
пиццерия с доставкой на дом       — ~350
```

**Новые страницы для создания (~20 страниц):**

| URL | H1 / Title |
|-----|------------|
| `/pizzeriya-zelenodolsk` | Пиццерия с доставкой в Зеленодольск |
| `/pitstseriya-na-lenina-volzhsk` | Пиццерия на ул. Ленина — Волжск |
| `/pitstseriya-na-shestakova-volzhsk` | Пиццерия на ул. Шестакова — Волжск |
| `/luchshaya-pitstseriya-volzhsk` | Лучшая пиццерия в Волжске |
| `/pitstseriya-dostavka-na-dom` | Пиццерия с доставкой на дом |
| `/pitstseriya-otzyvy-volzhsk` | Отзывы о пиццерии Волжск |
| `/pitstseriya-nedorogo-volzhsk` | Недорогая пиццерия Волжск |
| `/pitstseriya-rynok-volzhsk` | Пиццерия рядом с рынком Волжск |
| `/pitstseriya-tsentr-volzhsk` | Пиццерия в центре Волжска |
| `/italyanskaya-pitstseriya-volzhsk` | Итальянская пиццерия Волжск |
| `/pitstseriya-zakazat-onlayn` | Заказать в пиццерии онлайн |
| `/pitstseriya-skidki-aktsii-volzhsk` | Скидки и акции пиццерии Волжск |
| `/pitstseriya-besplatnaya-dostavka` | Пиццерия с бесплатной доставкой |
| `/pitstseriya-zelenodolsk-dostavka` | Пиццерия Зеленодольск доставка из Волжска |
| `/pitstseriya-vecherom-volzhsk` | Пиццерия вечером Волжск |
| `/pitstseriya-obed-volzhsk` | Обед в пиццерии Волжск |
| `/pitstseriya-korporativ-volzhsk` | Пиццерия для корпоратива Волжск |
| `/pitstseriya-na-dom-volzhsk` | Пиццерия на дом Волжск |
| `/pitstseriya-zelenodolsk-otzyvy` | Отзывы пиццерия Зеленодольск |
| `/pitstseriya-zelenodolsk-tsena` | Пиццерия Зеленодольск цены |

---

#### НАПРАВЛЕНИЕ Б: Доставка пиццы (высокая конкуренция)

**Целевые запросы ТОП-5:**
```
доставка пиццы волжск            — ~2000 запросов/мес
доставка пиццы зеленодольск       — ~600
доставка пиццы на дом             — ~3000
доставка пиццы недорого           — ~800
доставка пиццы вечером            — ~400
доставка пиццы 30 минут           — ~300
горячая пицца доставка            — ~500
доставка пиццы отзывы             — ~200
```

**Новые страницы (~15 страниц):**

| URL | H1 |
|-----|----|
| `/dostavka-pizzy-vecherom-volzhsk` | Доставка пиццы вечером в Волжске |
| `/dostavka-pizzy-30-minut` | Доставка пиццы за 30 минут |
| `/goryachaya-pitstsa-dostavka` | Горячая пицца с доставкой |
| `/dostavka-pizzy-nedorogo-volzhsk` | Недорогая доставка пиццы Волжск |
| `/dostavka-pizzy-otzyvy` | Отзывы доставка пиццы |
| `/dostavka-pizzy-na-dom-volzhsk` | Доставка пиццы на дом Волжск |
| `/dostavka-pizzy-besplatno` | Бесплатная доставка пиццы |
| `/dostavka-pizzy-tseny` | Цены на доставку пиццы |
| `/dostavka-pizzy-skolko-stoit` | Сколько стоит доставка пиццы |
| `/dostavka-pizzy-zelenodolsk-otzyvy` | Доставка пиццы Зеленодольск отзывы |
| `/dostavka-pizzy-zelenodolsk-tseny` | Доставка пиццы Зеленодольск цены |
| `/pitstsa-s-dostavkoy-na-dom` | Пицца с доставкой на дом |
| `/zakazat-pitstsu-nedorogo` | Заказать пиццу недорого |
| `/zakazat-pitstsu-na-dom-volzhsk` | Заказать пиццу на дом Волжск |
| `/zakazat-pitstsu-vecherom` | Заказать пиццу вечером |

---

#### НАПРАВЛЕНИЕ В: Суши и роллы

**Целевые запросы ТОП-5:**
```
суши волжск                       — ~1200 запросов/мес
роллы волжск                      — ~800
суши доставка волжск              — ~600
суши зеленодольск                 — ~300
роллы доставка                    — ~2000
суши на дом                       — ~1500
```

**Новые страницы (~15 страниц):**

| URL | H1 |
|-----|----|
| `/sushi-volzhsk` | Суши в Волжске |
| `/sushi-zelenodolsk` | Суши в Зеленодольске |
| `/rolly-volzhsk` | Роллы в Волжске |
| `/rolly-zelenodolsk` | Роллы в Зеленодольске |
| `/sushi-dostavka-na-dom` | Суши с доставкой на дом |
| `/rolly-dostavka-na-dom` | Роллы с доставкой на дом |
| `/sushi-nedorogo-volzhsk` | Суши недорого Волжск |
| `/zakazat-sushi-nedorogo` | Заказать суши недорого |
| `/sushi-otzyvy-volzhsk` | Суши отзывы Волжск |
| `/filadelfiya-rolly-volzhsk` | Ролл Филадельфия Волжск |
| `/kaliforniya-rolly-volzhsk` | Ролл Калифорния Волжск |
| `/sushi-set-volzhsk` | Суши сет Волжск |
| `/sushi-dostavka-zelenodolsk` | Суши доставка Зеленодольск (доп. вариант) |
| `/rolly-zelenodolsk-dostavka` | Роллы доставка Зеленодольск |
| `/zakazat-sushi-na-dom` | Заказать суши на дом |

---

#### НАПРАВЛЕНИЕ Г: Шашлык

**Целевые запросы ТОП-5:**
```
шашлык волжск                     — ~800 запросов/мес
шашлык доставка                   — ~1500
шашлык на дом                     — ~600
шашлык зеленодольск               — ~200
шашлык на углях                   — ~400
```

**Новые страницы (~10 страниц):**

| URL | H1 |
|-----|----|
| `/shashlyk-volzhsk` | Шашлык в Волжске |
| `/shashlyk-zelenodolsk` | Шашлык в Зеленодольске |
| `/shashlyk-na-dom` | Шашлык на дом |
| `/shashlyk-na-uglyakh` | Шашлык на углях |
| `/shashlyk-iz-svininy-dostavka` | Шашлык из свинины с доставкой |
| `/shashlyk-iz-kuritsy-dostavka` | Шашлык из курицы с доставкой |
| `/shashlyk-nedorogo-volzhsk` | Шашлык недорого Волжск |
| `/shashlyk-zelenodolsk-dostavka` | Шашлык Зеленодольск доставка |
| `/zakazat-shashlyk-na-dom` | Заказать шашлык на дом |
| `/shashlyk-otzyvy` | Шашлык отзывы |

---

#### НАПРАВЛЕНИЕ Д: Бургеры

**Целевые запросы ТОП-5:**
```
бургеры волжск                    — ~600 запросов/мес
бургер волжск                     — ~400
бургеры доставка                  — ~1500
бургер на дом                     — ~500
бургеры зеленодольск              — ~150
```

**Новые страницы (~10 страниц):**

| URL | H1 |
|-----|----|
| `/burgery-volzhsk` | Бургеры в Волжске |
| `/burgery-zelenodolsk` | Бургеры в Зеленодольске |
| `/burger-na-dom` | Бургер на дом |
| `/burger-nedorogo-volzhsk` | Бургер недорого Волжск |
| `/burger-s-dostavkoy` | Бургер с доставкой |
| `/dimburger-volzhsk` | ДИМБО Бургер Волжск |
| `/chizburger-volzhsk` | Чизбургер Волжск |
| `/chikenburger-volzhsk` | Чикенбургер Волжск |
| `/burgery-dostavka-na-dom` | Бургеры с доставкой на дом |
| `/burgery-zelenodolsk-dostavka` | Бургеры Зеленодольск доставка |

---

#### НАПРАВЛЕНИЕ Е: Районные страницы Волжск (локальное SEO)

**Ключевая стратегия**: Создать страницу под КАЖДЫЙ район и улицу Волжска.
Поисковики показывают разные результаты по запросам «пицца на [улица]».

**~15 страниц:**

| URL | H1 |
|-----|----|
| `/dostavka-pizzy-lenina-volzhsk` | Доставка пиццы на ул. Ленина |
| `/dostavka-pizzy-shestakova-volzhsk` | Доставка пиццы на ул. Шестакова |
| `/dostavka-pizzy-tsentr-volzhsk` | Доставка пиццы в центр Волжска |
| `/dostavka-edy-rayon-druzhby-volzhsk` | Доставка еды район Дружбы |
| `/dostavka-edy-mayak-volzhsk` | Доставка еды посёлок Маяк |
| `/dostavka-edy-gorgaz-volzhsk` | Доставка еды Горгаз |
| `/dostavka-edy-mashinka-volzhsk` | Доставка еды Машинка |
| `/dostavka-edy-zarya-volzhsk` | Доставка еды Заря |
| `/dostavka-edy-lugovaya-volzhsk` | Доставка еды Луговая |
| `/dostavka-edy-promzona-volzhsk` | Доставка еды Промзона |
| `/dostavka-edy-chasovennaya-volzhsk` | Доставка еды Часовенная |
| `/dostavka-edy-volgar-volzhsk` | Доставка еды Волжский |
| `/dostavka-edy-mamasevo` | Доставка еды Мамасево |
| `/dostavka-pizzy-okraina-volzhsk` | Доставка пиццы на окраину Волжска |
| `/dostavka-edy-karl-marksa-volzhsk` | Доставка еды на ул. Карла Маркса |

---

#### НАПРАВЛЕНИЕ Ж: Районные страницы Зеленодольск

**~10 страниц:**

| URL | H1 |
|-----|----|
| `/dostavka-pizzy-tsentr-zelenodolsk` | Доставка пиццы центр Зеленодольска |
| `/dostavka-edy-zelenodolsk-lenina` | Доставка еды на ул. Ленина Зеленодольск |
| `/dostavka-edy-zelenodolsk-okraina` | Доставка еды окраина Зеленодольска |
| `/dostavka-pizzy-zelenodolsk-na-dom` | Доставка пиццы на дом Зеленодольск |
| `/dostavka-edy-zelenodolsk-tsena` | Доставка еды Зеленодольск цена |
| `/dostavka-edy-zelenodolsk-bystro` | Быстрая доставка еды Зеленодольск |
| `/dostavka-edy-zelenodolssk-otzyvy` | Доставка еды Зеленодольск отзывы |
| `/dostavka-edy-zelenodolsk-vecherom` | Доставка еды вечером Зеленодольск |
| `/dostavka-edy-zelenodolsk-deshevo` | Дешёвая доставка еды Зеленодольск |
| `/dostavka-edy-stantsiya-zelenodolsk` | Доставка еды район станции Зеленодольск |

---

#### НАПРАВЛЕНИЕ З: Конкурентные страницы (перехват трафика)

**~8 страниц:**

| URL | H1 |
|-----|----|
| `/dodo-pizza-zelenodolsk` | Альтернатива Додо Пицца в Зеленодольске |
| `/dodo-pizza-sravnenie-volzhsk` | ДИМБО vs Додо Пицца — сравнение Волжск |
| `/pizza-time-volzhsk-alternativa` | Альтернатива Pizza Time Волжск |
| `/pizza-express-volzhsk-alternativa` | Альтернатива Pizza Express Волжск |
| `/dostavka-edy-kazan-alternativa` | Доставка еды альтернатива (Казань/Волжск) |
| `/obzor-pitstseriy-volzhsk` | Обзор пиццерий Волжска |
| `/obzor-dostavki-edy-zelenodolsk` | Обзор доставки еды Зеленодольск |
| `/luchshaya-dostavka-edy-volzhsk` | Лучшая доставка еды в Волжске |

---

#### НАПРАВЛЕНИЕ И: Сравнительные / информационные страницы

**~10 страниц:**

| URL | H1 |
|-----|----|
| `/skolko-stoit-dostavka-pizzy` | Сколько стоит доставка пиццы |
| `/skolko-stoit-shashlyk` | Сколько стоит шашлык |
| `/gde-zakazat-edy-vecherom` | Где заказать еду вечером |
| `/gde-zakazat-edy-zelenodolsk` | Где заказать еду в Зеленодольске |
| `/kak-zakazat-edy-online` | Как заказать еду онлайн |
| `/top-pitstseriy-volzhsk` | Топ пиццерий Волжска |
| `/menyu-dostavki-edy-volzhsk` | Меню доставки еды Волжск |
| `/menyu-dostavki-edy-zelenodolsk` | Меню доставки еды Зеленодольск |
| `/tseny-na-dostavku-edy` | Цены на доставку еды |
| `/tseny-pitstsa-volzhsk` | Цены на пиццу в Волжске |

---

## 4. ИТОГО ПЛАН МАСШТАБИРОВАНИЯ

### Выполнено (12.04.2026):

| Категория | Страниц | Статус |
|-----------|---------|--------|
| Блог | 30 | DONE |
| Сезонные мероприятия | 15 | DONE |
| Мастер-классы | 2 | DONE |
| Продукт × Город | 52 | DONE |
| Кейтеринг B2B | 10 | DONE |
| Отзывы | 4 | DONE |
| **ИТОГО выполнено** | **113** | **DONE** |

### Запланировано (направления А-И):

| Направление | Новых страниц |
|-------------|---------------|
| А. Пиццерия | ~20 |
| Б. Доставка пиццы | ~15 |
| В. Суши и роллы | ~15 |
| Г. Шашлык | ~10 |
| Д. Бургеры | ~10 |
| Е. Районы Волжск | ~15 |
| Ж. Районы Зеленодольск | ~10 |
| З. Конкурентные | ~8 |
| И. Информационные | ~10 |
| **ИТОГО запланировано** | **~113 новых страниц** |

### После выполнения всех направлений:

| Метрика | Сейчас | После |
|---------|--------|-------|
| Всего URL | ~266 | **~380+** |
| Волжск страницы | ~177 | ~262 |
| Зеленодольск страницы | ~78 | ~118 |
| Покрытие ключевых слов | ~190 | ~500+ |

---

## 5. Технические требования для реализации

### 5.1 Что нужно доработать перед масштабированием

1. **Активировать prerendering** — без этого новые страницы тоже не будут индексироваться
2. **react-helmet-async** — надёжное управление мета-тегами
3. **Google Search Console** — подключить реальный verification код
4. **Google Analytics 4** — подключить аналитику

### 5.2 Архитектура для 380+ страниц

Существующая data-driven архитектура (использована для 113 страниц):

| Шаблон | Для чего |
|--------|----------|
| `BlogArticleTemplate` | Блог-статьи |
| `SeasonalPageTemplate` | Мероприятия + мастер-классы |
| `ProductCityTemplate` | Товары × город |
| `CateringTemplate` | B2B кейтеринг |
| `ReviewsPageTemplate` | Отзывы и рейтинги |
| `CityDeliverySEOTemplate` | Доставка по городам (существует) |

Нужные дополнительные шаблоны:
- `PizzeriaSEOTemplate` — для страниц «пиццерия [город/район]»
- `ComparisonSEOPage` — для конкурентных страниц
- `AreaDeliveryTemplate` — для районных страниц
- `InfoSEOPage` — для информационных страниц

Каждый шаблон + дата-файл + `generateSEORoutes()` = минимум нового кода.

### 5.3 Порядок реализации по приоритету

| Приоритет | Направление | Страниц | Причина |
|-----------|-------------|---------|---------|
| P0 | Активация prerendering | — | Без этого всё остальное не работает |
| P1 | А. Пиццерия | 20 | Самое конкурентное направление |
| P1 | Б. Доставка пиццы | 15 | Самый большой трафик |
| P2 | В. Суши и роллы | 15 | Второй по трафику |
| P2 | Г. Шашлык | 10 | Высокая конверсия |
| P3 | Е. Районы Волжск | 15 | Низкоконкурентные запросы |
| P3 | Ж. Районы Зеленодольск | 10 | Новое направление |
| P4 | Д. Бургеры | 10 | Средний трафик |
| P4 | З. Конкурентные | 8 | Перехват чужого трафика |
| P4 | И. Информационные | 10 | Долгосрочный SEO эффект |

---

## 6. Ожидаемые результаты масштабирования

### Через 3 месяца после реализации + prerendering:
- 380+ страниц в индексе Яндекса и Google
- ТОП-10 по 70% целевых запросов
- ТОП-5 по 40% целевых запросов
- 1000-2000 органических визитов/мес

### Через 6 месяцев:
- ТОП-5 по 60% целевых запросов
- ТОП-3 по «доставка пиццы волжск», «суши волжск»
- 3000-5000 органических визитов/мес
- 100-150 заказов/мес из поиска

### Через 12 месяцев:
- ТОП-3 по 80% запросов Волжск
- ТОП-5 по 50% запросов Зеленодольск
- 5000-8000 органических визитов/мес
- 200+ заказов/мес из поиска

---

## 7. Ключевые файлы проекта

### Инфраструктура
| Файл | Назначение |
|------|-----------|
| `src/utils/routeGenerator.tsx` | Генератор маршрутов из SEORouteConfig[] |
| `src/utils/schemaOrg.ts` | Schema.org генераторы (Restaurant, Article, Event, Service) |
| `src/utils/seo.ts` | SEO конфигурация, 190+ ключевых слов |
| `src/components/seo/SchemaMarkup.tsx` | Schema.org разметка компонентов |

### Шаблоны SEO-страниц
| Файл | Тип страниц |
|------|------------|
| `src/components/seo/BlogArticleTemplate.tsx` | Блог-статьи (30) |
| `src/components/seo/SeasonalPageTemplate.tsx` | Сезонные + мастер-классы (17) |
| `src/components/seo/ProductCityTemplate.tsx` | Продукт × город (52) |
| `src/components/seo/CateringTemplate.tsx` | Кейтеринг B2B (10) |
| `src/components/seo/ReviewsPageTemplate.tsx` | Отзывы и рейтинги (4) |
| `src/components/seo/CityDeliverySEOTemplate.tsx` | Доставка по городам (16) |

### Данные
| Файл | Записей |
|------|---------|
| `src/data/blogData.ts` | 30 статей |
| `src/data/seasonalData.ts` | 15 мероприятий |
| `src/data/productCityData.ts` | 52 товар×город |
| `src/data/cateringData.ts` | 10 услуг кейтеринга |
| `src/data/reviewsData.ts` | 4 страницы отзывов |
| `src/data/faqData.ts` | FAQ по 5 категориям |

### Маршруты
| Файл | Маршрутов |
|------|-----------|
| `src/routes/blogRoutes.ts` | 30 |
| `src/routes/seasonalRoutes.ts` | 15 |
| `src/routes/productCityRoutes.ts` | 52 |
| `src/routes/cateringRoutes.ts` | 10 |
| `src/routes/reviewRoutes.ts` | 4 |
| `src/routes/masterclassRoutes.ts` | 2 |

### SEO-файлы
| Файл | URL | Содержание |
|------|-----|-----------|
| sitemap.xml | https://dimbopizza.ru/sitemap.xml | 266 URL |
| robots.txt | https://dimbopizza.ru/robots.txt | 172 Allow-директивы |

---

*Обновлено: 12.04.2026*
*Следующий шаг: активировать prerendering и начать создавать страницы направления А (Пиццерия)*
