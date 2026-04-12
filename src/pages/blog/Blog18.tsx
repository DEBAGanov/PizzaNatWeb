import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[18]

export function Blog18Page() {
  return <BlogArticleTemplate config={config} />
}
