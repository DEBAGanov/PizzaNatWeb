import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[24]

export function Blog24Page() {
  return <BlogArticleTemplate config={config} />
}
