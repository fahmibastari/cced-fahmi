import { getArticles } from '@/data/data'
import ArticleContentClient from './ArticleContentClient'

const ArticleContent = async () => {
  const articles = await getArticles()

  return <ArticleContentClient articles={articles} />
}

export default ArticleContent
