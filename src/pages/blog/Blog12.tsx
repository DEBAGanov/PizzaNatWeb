import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[12]

export function Blog12Page() {
  return <BlogArticleTemplate config={config} />
}
