import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[25]

export function Blog25Page() {
  return <BlogArticleTemplate config={config} />
}
