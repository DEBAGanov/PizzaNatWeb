import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[0]

export function Blog0Page() {
  return <BlogArticleTemplate config={config} />
}
