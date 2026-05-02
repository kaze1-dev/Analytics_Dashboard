import 'dotenv/config'
import { PrismaClient } from '@/app/generated/prisma/client'
import pg from "pg"
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var prisma: PrismaClient | undefined
}

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL,
})

console.log("connecting to database: ", process.env.DATABASE_URL);

const adapter = new PrismaPg(pool)
const prisma = globalThis.prisma || new PrismaClient({adapter})

if(process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma