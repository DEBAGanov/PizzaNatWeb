import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[1]

export function Blog1Page() {
  return <BlogArticleTemplate config={config} />
}
