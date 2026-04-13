import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Validacion de variables de entorno fallida en config.js", parsedEnv.error.format());
  throw new Error("Variables de entorno inválidas");
}

export const config = {
  port: parsedEnv.data.PORT,
  nodeEnv: parsedEnv.data.NODE_ENV,
  databaseUrl: parsedEnv.data.NODE_ENV === "production" && !parsedEnv.data.DATABASE_URL
    ? (() => { throw new Error("DATABASE_URL is required in production"); })()
    : parsedEnv.data.DATABASE_URL
};

export const isDevelopment = config.nodeEnv === "development";
export const isProduction = config.nodeEnv === "production";
