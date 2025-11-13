import "dotenv/config"
import {execSync} from "child_process"
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'
import { prisma } from "@/lib/prisma"

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Please provide a DataBase_URL environment variable")
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set("schema", schema)

    return url.toString()
}

export default <Environment>{
  name: 'custom',
  viteEnvironment: 'ssr',
 
  async setup() {
    const schema = randomUUID()

    const database = generateDatabaseURL(schema)

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await prisma.$disconnect
      }
    }
  }
  
}