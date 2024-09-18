import { NextApiRequest, NextApiResponse } from 'next';
import seedrandom from 'seedrandom';
import { allFakers } from '@faker-js/faker';
import { User } from '@/interfaces/user';
import { Region } from '@/interfaces/region';


const generateRandomUser = (region: Region, seed: string, page: number, errorCount: number): User => {
  const rng = seedrandom(seed + page)
  console.log('seed', seed, 'page', page, 'errorCount', errorCount, 'rng', rng)

  const faker = allFakers[region]
  const fullName = faker.person.fullName()

  const address = `${faker.location.city()}, ${faker.location.streetAddress()}`
  const phone = faker.phone.number()

  return {
    id: faker.string.uuid(),
    fullName,
    address,
    phone,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region = 'en_US', seed = '42', page = '1', errors = '0' } = req.query as Record<string, string>;
  const errorCount = parseInt(errors);
  const pageNumber = parseInt(page);

  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    users.push(generateRandomUser(region as Region, seed, pageNumber, errorCount))
  }

  res.status(200).json({ users });
}
