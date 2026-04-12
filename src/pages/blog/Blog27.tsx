import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[27]

export function Blog27Page() {
  return <BlogArticleTemplate config={config} />
}
