import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[8]

export function Blog8Page() {
  return <BlogArticleTemplate config={config} />
}
