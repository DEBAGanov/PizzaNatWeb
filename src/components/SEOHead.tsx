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
  structuredData?: object
  noIndex?: boolean
}

export function SEOHead({ 
  page, 
  title, 
  description, 
  keywords, 
  ogImage, 
  structuredData,
  noIndex = false 
}: SEOHeadProps) {
  
  useEffect(() => {
    const seoData = generatePageSeo(page, {
      title,
      description,
      keywords,
      ogImage,
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
  }, [page, title, description, keywords, ogImage, structuredData, noIndex])

  return null // Этот компонент не рендерит ничего видимого
}

// Обертка для страниц с предустановленными мета-тегами
interface SEOPageWrapperProps {
  page: string
  children: React.ReactNode
  customSeo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    structuredData?: object
    noIndex?: boolean
  }
}

export function SEOPageWrapper({ page, children, customSeo }: SEOPageWrapperProps) {
  return (
    <>
      <SEOHead page={page} {...(customSeo || {})} />
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