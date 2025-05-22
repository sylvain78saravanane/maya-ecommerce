// scripts/create-admin.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const hashedPassword = await bcrypt.hash('sylvaintestoni', 10)

  const user = await prisma.user.upsert({
    where: { email: 'sylvain.testoni@email.com' },
    update: {},
    create: {
      name: 'Sylvain Testoni',
      email: 'sylvain.testoni@email.com',
      password: hashedPassword,
      isAdmin: true
    }
  })

  console.log('Admin created or already exists:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

  // TODO : Realiser le script pour checkout et la confirmation de commande de manière cohérente.

