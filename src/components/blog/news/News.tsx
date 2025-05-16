

import { getNews } from '@/data/data'
import NewsContentClient from './NewsContentClient'

const NewsContent = async () => {
  const articles = await getNews()

  return <NewsContentClient articles={articles} />
}

export default NewsContent
