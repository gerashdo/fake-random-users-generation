import { NextApiRequest, NextApiResponse } from 'next'
import seedrandom from 'seedrandom'
import { allFakers } from '@faker-js/faker'
import { generateErrorsByCount, generateErrorsByProbability } from '@/helpers/errors'
import { generateFakeUserData } from '@/helpers/userGeneration'
import { User } from '@/interfaces/user'
import { Region } from '@/interfaces/region'


const generateRandomUser = (
  region: Region,
  seed: string,
  page: number,
  errorCount: number,
  index: number
): User => {
  const fullSeed = `${seed}-${page}-${index}`
  const rng = seedrandom(fullSeed)
  const faker = allFakers[region]
  faker.seed(rng.int32())

  let {fullName, address, phone} = generateFakeUserData(faker)
  const fields = [fullName, address, phone]

  if (errorCount > 0 && errorCount < 1) {
    generateErrorsByProbability(rng, errorCount, fields)
  } else if (errorCount >= 1) {
    generateErrorsByCount(rng, errorCount, fields)
  }

  [fullName, address, phone] = fields

  return {
    id: faker.string.uuid(),
    fullName,
    address,
    phone,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region = 'en_US', seed = '0', page = '1', errors = '0' } = req.query as Record<string, string>
  const errorCount = Number(errors)
  const pageNumber = parseInt(page)

  const users: User[] = []
  for (let i = 0; i < 10; i++) {
    users.push(generateRandomUser(region as Region, seed, pageNumber, errorCount, i))
  }

  res.status(200).json({ users })
}
