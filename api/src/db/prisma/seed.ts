import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A main function so that you can use async/await
async function main() {
  const usuario = await prisma.User.create({
    data: { Nombre: 'Facu' }
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })