import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[21]

export function Blog21Page() {
  return <BlogArticleTemplate config={config} />
}
