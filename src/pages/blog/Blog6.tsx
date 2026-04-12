import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[6]

export function Blog6Page() {
  return <BlogArticleTemplate config={config} />
}
