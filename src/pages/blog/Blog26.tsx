import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[26]

export function Blog26Page() {
  return <BlogArticleTemplate config={config} />
}
