import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[23]

export function Blog23Page() {
  return <BlogArticleTemplate config={config} />
}
