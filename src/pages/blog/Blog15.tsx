import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[15]

export function Blog15Page() {
  return <BlogArticleTemplate config={config} />
}
