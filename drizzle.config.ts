import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/config/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://FormGenius_owner:hPrswH40vlKa@ep-twilight-heart-a5qmxmqk.us-east-2.aws.neon.tech/FormGenius?sslmode=require',
  }
});