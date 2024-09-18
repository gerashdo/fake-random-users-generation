import { Faker } from "@faker-js/faker"

export const generateFakeUserData = (faker: Faker) => {
  return {
    fullName: faker.person.fullName(),
    address: `${faker.location.city()}, ${faker.location.streetAddress()}`,
    phone: faker.phone.number(),
  }
}
