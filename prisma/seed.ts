import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Seed News
  const newsData = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.url(),
    slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
  }))

  await prisma.news.createMany({
    data: newsData,
  })

  // Seed Article
  const articleData = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.url(),
    slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
  }))

  await prisma.article.createMany({
    data: articleData,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
