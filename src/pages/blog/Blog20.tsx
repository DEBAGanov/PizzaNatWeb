import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[20]

export function Blog20Page() {
  return <BlogArticleTemplate config={config} />
}
