import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[14]

export function Blog14Page() {
  return <BlogArticleTemplate config={config} />
}
