import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[17]

export function Blog17Page() {
  return <BlogArticleTemplate config={config} />
}
