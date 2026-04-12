import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[22]

export function Blog22Page() {
  return <BlogArticleTemplate config={config} />
}
