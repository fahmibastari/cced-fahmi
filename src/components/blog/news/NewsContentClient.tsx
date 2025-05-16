'use client'

import { useState } from 'react'
import { type Article } from '@prisma/client'
import CardBig from '../utils/CardBig'
import CardSmall from '../utils/CardSmall'
import ArticleModal from '../utils/ArticleModal'
import PaginationArticleArticle from '../utils/Pagination'

interface Props {
  articles: Article[]
}

const ArticleContentClient = ({ articles }: Props) => {
  const [modalData, setModalData] = useState<Article | null>(null)
  const handleCloseModal = () => setModalData(null)

  const featuredArticle = articles[0]

  return (
    <main className='container mx-auto my-8 p-4 flex-col space-y-14'>
      <section>
        <h3 className='mb-4 text-2xl font-bold md:text-3xl text-[#025908]'>
          Berita Terbaru
        </h3>
        {featuredArticle ? (
          <div onClick={() => setModalData(featuredArticle)}>
            <CardBig
              href='#'
              srcImage={featuredArticle.thumbnail}
              title={featuredArticle.title}
              description={featuredArticle.content.slice(0, 250)}
              createdAt={featuredArticle.createdAt ?? undefined}
            />
          </div>
        ) : (
          <p>Loading Article terbaru...</p>
        )}
      </section>

      <section>
        <h3 className='mb-4 text-xl font-bold md:text-2xl text-[#025908]'>
          Berita Lainnya
        </h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {articles.length > 0 ? (
            articles.slice(1).map((article) => (
              <div key={article.id} onClick={() => setModalData(article)}>
                <CardSmall
                  href='#'
                  srcImage={article.thumbnail}
                  title={article.title}
                  description={article.content.slice(0, 100)}
                  createdAt={article.createdAt ?? undefined}
                />
              </div>
            ))
          ) : (
            <p>Loading Article lainnya...</p>
          )}
        </div>
      </section>

      <PaginationArticleArticle />

      {modalData && (
        <ArticleModal
          isOpen={!!modalData}
          onClose={handleCloseModal}
          title={modalData.title}
          content={modalData.content}
          thumbnail={modalData.thumbnail}
          createdAt={modalData.createdAt ?? undefined}
        />
      )}
    </main>
  )
}

export default ArticleContentClient
