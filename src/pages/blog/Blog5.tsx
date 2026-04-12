import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[5]

export function Blog5Page() {
  return <BlogArticleTemplate config={config} />
}
