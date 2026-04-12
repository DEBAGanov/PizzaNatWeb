# SEO Стратегия ДИМБО Пицца — Волжск + Зеленодольск

> Последнее обновление: 12.04.2026
> Сайт: https://dimbopizza.ru (9 месяцев)

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
| Даты в sitemap.xml обновлены | `public/sitemap.xml` | DONE |
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
| **Итого Волжск** | **~101** | |

### Зеленодольск
| Тип | Кол-во | Примеры URL |
|-----|--------|-------------|
| Kids | 34 | /detskiy-den-rozhdeniya-zelenodolsk... |
| Доставка еды | 16 | /dostavka-pizzy-zelenodolsk... |
| **Итого Зеленодольск** | **~50** | |

### Общий итог: ~150+ URL

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
| `/shashlyk-iz-svininy-dostavka` | Шашlyк из свинины с доставкой |
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
| **ИТОГО** | **~113 новых страниц** |

### После масштабирования:

| Метрика | Сейчас | После |
|---------|--------|-------|
| Всего URL | ~150 | **~260+** |
| Волжск страницы | ~101 | ~170 |
| Зеленодольск страницы | ~50 | ~95 |
| Покрытие ключевых слов | ~190 | ~500+ |

---

## 5. Технические требования для реализации

### 5.1 Что нужно доработать перед масштабированием

1. **Активировать prerendering** — без этого новые страницы тоже не будут индексироваться
2. **react-helmet-async** — надёжное управление мета-тегами
3. **Google Search Console** — подключить реальный verification код
4. **Google Analytics 4** — подключить аналитику

### 5.2 Архитектура для 260+ страниц

Для 113 новых страниц используем параметризованные шаблоны (как `CityDeliverySEOTemplate`):

- `PizzeriaSEOTemplate` — для страниц «пиццерия [город/район]»
- `ComparisonSEOPage` — для конкурентных страниц
- `AreaDeliveryTemplate` — для районных страниц
- `InfoSEOPage` — для информационных страниц

Каждый шаблон + дата-файл = минимум нового кода.

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
- 260+ страниц в индексе Яндекса и Google
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

*Обновлено: 12.04.2026*
*Следующий шаг: активировать prerendering и начать создавать страницы направления А (Пиццерия)*
