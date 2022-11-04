import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/wilkgillian.png'
    }
  });
  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });
  await prisma.game.create({
    data: {
      date: '2022-12-04T10:49:26.934Z',
      fisrtTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  });
  await prisma.game.create({
    data: {
      date: '2022-12-11T10:49:26.934Z',
      fisrtTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          fisrtTeamPoints: 2,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
}
main();
