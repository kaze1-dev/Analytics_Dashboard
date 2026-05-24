import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("\n🚀 STABILITY MODE ACTIVATED...");
  const startTime = Date.now();

  // 1. CUSTOMERS
  const customerCount = faker.number.int({ min: 1245, max: 1862 });
  const customersToCreate = [];
  const usedEmails = new Set();

  while (customersToCreate.length < customerCount) {
    const email = faker.internet.email().toLowerCase();
    if (!usedEmails.has(email)) {
      usedEmails.add(email);
      customersToCreate.push({
        name: faker.person.fullName(),
        email: email,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        // Assigning statuses with realistic distribution
        status: faker.helpers.arrayElement(["active", "active", "active", "inactive", "pending", "lead"]),
        createdAt: faker.date.past({ years: 1 }),
      });
    }
  }

  await prisma.customer.createMany({ data: customersToCreate, skipDuplicates: true });
  
  // Only grab customers who are actually eligible to have orders
  const validCustomers = await prisma.customer.findMany({ 
    where: { 
      status: { in: ["active", "inactive"] } 
    },
    select: { id: true, createdAt: true } 
  });

  // 2. PRODUCTS
  const productCount = faker.number.int({ min: 150, max: 250 });
  const productData = Array.from({ length: productCount }).map(() => ({
    name: faker.commerce.productName() + " " + faker.string.alphanumeric(3),
    price: parseFloat(faker.commerce.price({ min: 15, max: 400 })),
    stock: faker.number.int({ min: 5, max: 150 }),
    createdAt: faker.date.past({ years: 1 }),
  }));
  await prisma.product.createMany({ data: productData, skipDuplicates: true });
  const allProducts = await prisma.product.findMany();

  // 3. ORDERS (Sequential Mode - Logical Filtering)
  const orderCount = faker.number.int({ min: 1000, max: 2000 });
  console.log(`\n📦 Generating ${orderCount} orders for Active/Inactive customers...`);

  for (let i = 1; i <= orderCount; i++) {
    try {
      const customer = faker.helpers.arrayElement(validCustomers);
      const orderDate = faker.date.between({ from: customer.createdAt, to: new Date() });
      const itemCount = faker.number.int({ min: 1, max: 5 });
      const randomProducts = faker.helpers.arrayElements(allProducts, itemCount);
      
      let runningTotal = 0;
      const orderItemsData = randomProducts.map((p) => {
        const qty = faker.number.int({ min: 1, max: 7 });
        runningTotal += p.price * qty;
        return { productId: p.id, quantity: qty, price: p.price };
      });

      await prisma.order.create({
        data: {
          customerId: customer.id,
          status: faker.helpers.arrayElement(["pending", "shipped", "delivered", "cancelled", "delivered", "delivered"]),
          totalAmount: runningTotal,
          createdAt: orderDate,
          items: { create: orderItemsData },
        },
      });

      if (i % 10 === 0 || i === orderCount) {
        const percentage = Math.round((i / orderCount) * 100);
        const bar = "█".repeat(Math.round(percentage / 4)) + "░".repeat(25 - Math.round(percentage / 4));
        process.stdout.write(`\r   🚜 [${bar}] ${percentage}% | ${i}/${orderCount} orders`);
      }
    } catch (err) {
      continue; 
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n\n✨ MISSION ACCOMPLISHED in ${duration}s!`);
}

main()
  .catch((e) => {
    console.error("\n❌ Fatal Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });