# Design

## Scope

Единая визуальная система standalone-лендингов Dimbo. Новый `/v1/master-klass` наследует систему `/v1/volzhsk`; это расширение контента, а не отдельный визуальный мир.

## Typography

- Основной и display-шрифт: Manrope 500/600/700/800.
- Заголовки: 800, line-height 1.08–1.1, letter-spacing −0.02em, `text-wrap: balance`.
- Основной текст: 14–18px, line-height 1.55–1.6, не более 70ch.
- Числовые показатели: `font-variant-numeric: tabular-nums`.

## Color

- Background: `#FBF3E3`.
- Primary yellow: `#FFC627`.
- Ink: `#4A3F38`; secondary ink: `#635749`.
- Coral: `#C73040`; teal: `#6FD9C6`; purple: `#6B47C2`.
- Карточки преимущественно белые; цветные секции используют оттенки жёлтого, кораллового, бирюзового и фиолетового из существующего лендинга.

## Form and components

- Mobile-first, контейнер 460px; с 900px — 1120px.
- Hero: две колонки на desktop, одна на mobile; фотография занимает половину области и остаётся значимым доказательством услуги.
- Карточки: скругления 16–28px, мягкие тени со смещением либо тонкая рамка, не оба эффекта одновременно.
- Кнопки: pill, минимальная высота 44–54px; primary dark, secondary yellow; видимый `:focus-visible`.
- Иконки: Tabler Icons в едином стиле, без эмодзи как замены иконок.
- Мобильная sticky-CTA учитывает `safe-area-inset-bottom`.
- Motion: одна непрерывная лента; `prefers-reduced-motion` отключает движение и transitions.
- Изображения: реальные фотографии Dimbo, WebP, заданные dimensions, eager только для hero, lazy для остальных.

## Content distinctions of /v1/master-klass

Визуальные токены не меняются. Вместо VR и игровой зоны используются этапы приготовления пиццы, реальные фото мастер-классов, форматы для групп от 10 человек, короткая форма записи и FAQ. Цена отображается только как «По заявке». Основной мессенджер — MAX; после успешной заявки он открывается автоматически.

## SEO and resilient UI

- Один H1, уникальные title/description, canonical, OG/Twitter 1200×630.
- Schema.org: Service, FAQPage, BreadcrumbList.
- `/master-klass-po-prigotovleniyu-pitstsy` ведёт на основной `/v1/master-klass`; дублирующий URL исключён из sitemap.
- Ошибки формы не смешиваются с ошибками валидации телефона.
- При недоступности внешней карты поверх неё остаётся ссылка на Яндекс.Карты.

## Asset provenance

Производные в `public/images/masterclass-landing/` созданы из пользовательских фотографий `public/images/kids/masterclass-1.jpg` — `masterclass-4.jpg`. Локальная конвертация cwebp/ffmpeg без AI-генерации. Provenance хранится в sidecar JSON рядом с каждым WebP и в JPEG COM для OG-обложки.
