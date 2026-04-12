import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[29]

export function Blog29Page() {
  return <BlogArticleTemplate config={config} />
}
