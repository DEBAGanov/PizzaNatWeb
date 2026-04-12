import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[16]

export function Blog16Page() {
  return <BlogArticleTemplate config={config} />
}
