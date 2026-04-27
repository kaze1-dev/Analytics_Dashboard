import prisma from "@/lib/prisma"
import { faker } from "@faker-js/faker"

async function main() {

  // ---------------------------
  // 2. CUSTOMERS (100)
  // ---------------------------
  await prisma.customer.createMany({
    data: Array.from({ length: 557 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    })),
  })

  const customers = await prisma.customer.findMany()

  console.log("👤 Customers created")

  // ---------------------------
  // 3. PRODUCTS (200)
  // ---------------------------
  await prisma.product.createMany({
    data: Array.from({ length: 453 }).map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      stock: faker.number.int({ min: 10, max: 200 }),
    })),
  })

  const products = await prisma.product.findMany()

  console.log("🛍️ Products created")

  // ---------------------------
  // 4. ORDERS + ORDER ITEMS (500)
  // ---------------------------
  console.log("📦 Creating orders...")

  for (let i = 0; i < 643; i++) {
    if (i % 25 === 0) {
      console.log(`📦 Progress: ${i}/643 orders`)
    }

    const customer = faker.helpers.arrayElement(customers)

    let total = 0

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        status: faker.helpers.arrayElement([
          "pending",
          "shipped",
          "delivered",
        ]),
        totalAmount: 0,
      },
    })

    const itemCount = faker.number.int({ min: 1, max: 5 })

    const orderItems = []

    for (let j = 0; j < itemCount; j++) {
      const product = faker.helpers.arrayElement(products)
      const quantity = faker.number.int({ min: 1, max: 3 })

      total += product.price * quantity

      orderItems.push({
        orderId: order.id,
        productId: product.id,
        quantity,
        price: product.price,
      })
    }

    await prisma.orderItem.createMany({
      data: orderItems,
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { totalAmount: total },
    })
  }

  console.log("📦 Orders created")
}

main()
  .then(() => {
    console.log("✅ Seeding completed")
  })
  .catch((e) => {
    console.error("❌ Error:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })