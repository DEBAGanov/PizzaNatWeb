import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[28]

export function Blog28Page() {
  return <BlogArticleTemplate config={config} />
}
