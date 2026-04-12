import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[4]

export function Blog4Page() {
  return <BlogArticleTemplate config={config} />
}
