import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[2]

export function Blog2Page() {
  return <BlogArticleTemplate config={config} />
}
