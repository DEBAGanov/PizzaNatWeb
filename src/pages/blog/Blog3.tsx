import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[3]

export function Blog3Page() {
  return <BlogArticleTemplate config={config} />
}
