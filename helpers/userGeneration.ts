import { FakeData } from "@/interfaces/user"
import { Faker } from "@faker-js/faker"

export const generateFakeUserData = (faker: Faker): FakeData => {
  return {
    fullName: faker.person.fullName(),
    address: `${faker.location.streetAddress(true)}, ${faker.location.city()}, ${faker.location.state()}`,
    phone: faker.phone.number(),
  }
}
