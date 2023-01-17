module.exports = () => {
  const { faker } = require("@faker-js/faker")

  const products = []

  for (let i = 0; i < 100; i++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    })
  }

  return {
    products,
  }
}
