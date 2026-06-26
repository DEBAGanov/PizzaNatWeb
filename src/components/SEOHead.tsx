/**
 * @file: SEOHead.tsx
 * @description: React компонент для управления SEO мета-тегами страниц
 * @dependencies: React Helmet, SEO utils
 * @created: 2025-01-24
 */

import { useEffect } from 'react'
import { BASE_SEO, generatePageSeo, setPageMeta } from '../utils/seo'
import { generateRestaurantSchema, generateLocalBusinessSchema, insertSchemaMarkup } from '../utils/schemaOrg'

interface SEOHeadProps {
  page: string
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  structuredData?: object
  noIndex?: boolean
}

export function SEOHead({
  page,
  title,
  description,
  keywords,
  ogImage,
  canonical,
  structuredData,
  noIndex = false
}: SEOHeadProps) {

  useEffect(() => {
    const seoData = generatePageSeo(page, {
      title,
      description,
      keywords,
      ogImage,
      canonical,
      structuredData
    })

    setPageMeta(seoData)
    
    // Обновляем robots meta для noIndex
    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    
    if (noIndex) {
      robotsMeta.setAttribute('content', 'noindex, nofollow')
    } else {
      robotsMeta.setAttribute('content', 'index, follow')
    }
    
    // Cleanup function для очистки при размонтировании
    return () => {
      // Возвращаем базовые мета-теги
      document.title = BASE_SEO.defaultTitle
    }
  }, [page, title, description, keywords, ogImage, canonical, structuredData, noIndex])

  return null // Этот компонент не рендерит ничего видимого
}

// Обертка для страниц с предустановленными мета-тегами
interface PageSeoFields {
  title?: string
  description?: string
  // keywords может прийти строкой ("a, b, c") или массивом — нормализуем ниже
  keywords?: string[] | string
  // часть страниц передаёт imageUrl вместо ogImage — поддерживаем оба
  imageUrl?: string
  ogImage?: string
  canonical?: string
  structuredData?: object
  noIndex?: boolean
}

interface SEOPageWrapperProps extends PageSeoFields {
  page?: string
  children: React.ReactNode
  customSeo?: PageSeoFields
}

// ВАЖНО: раньше брались только page+customSeo, а SEO-поля, переданные верхним
// уровнем (<SEOPageWrapper {...seoData}>), молча отбрасывались — из-за чего ~175
// SEO-страниц отдавали дефолтную мету и canonical на главную. Теперь top-level
// поля тоже учитываются.
export function SEOPageWrapper({ page, children, customSeo, ...rest }: SEOPageWrapperProps) {
  const seo = customSeo ?? rest
  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords
    : typeof seo.keywords === 'string'
      ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : undefined

  return (
    <>
      <SEOHead
        page={page ?? ''}
        title={seo.title}
        description={seo.description}
        keywords={keywords}
        ogImage={seo.ogImage ?? seo.imageUrl}
        canonical={seo.canonical}
        structuredData={seo.structuredData}
        noIndex={seo.noIndex}
      />
      {children}
    </>
  )
}

// Хук для программного обновления SEO в компонентах
export function useSEO(page: string, data?: {
  title?: string
  description?: string
  keywords?: string[]
}) {
  useEffect(() => {
    const seoData = generatePageSeo(page, data)
    setPageMeta(seoData)
  }, [page, data])
}