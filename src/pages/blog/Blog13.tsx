import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[13]

export function Blog13Page() {
  return <BlogArticleTemplate config={config} />
}
