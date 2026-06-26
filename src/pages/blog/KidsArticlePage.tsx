/**
 * @file: KidsArticlePage.tsx
 * @description: Резолвер детских блог-статей — по pathname находит статью в
 * KIDS_BLOG_PAGES и рендерит общим BlogArticleTemplate (ctaType: 'kids').
 * Один компонент на все детские статьи (вместо отдельного файла на каждую).
 */
import { useLocation } from 'react-router-dom'
import { KIDS_BLOG_PAGES } from '../../data/kidsBlogData'
import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'

export function KidsArticlePage() {
  const { pathname } = useLocation()
  const slug = decodeURIComponent(pathname).replace(/^\/+/, '').replace(/\/+$/, '')
  const article = KIDS_BLOG_PAGES.find((a) => a.slug === slug)
  if (!article) return null
  return <BlogArticleTemplate config={article} />
}
