import { z } from 'zod';

const configSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).default(12),
  ALLOWED_ORIGINS: z.string().default('http://localhost:5173'),
  APP_NAME: z.string().default('agrotech-api'),
});

const parsed = configSchema.safeParse(process.env);

if (!parsed.success && process.env.NODE_ENV !== 'test') {
  console.error('❌ Variables de entorno inválidas:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const data = parsed.success ? parsed.data : {
  PORT: 3000,
  NODE_ENV: 'test',
  JWT_SECRET: 'test-secret-de-al-menos-32-caracteres-para-testing',
  JWT_EXPIRES_IN: '15m',
  BCRYPT_ROUNDS: 10,
  ALLOWED_ORIGINS: 'http://localhost:5173',
  APP_NAME: 'agrotech-api',
};

export const config = {
  port: data.PORT,
  nodeEnv: data.NODE_ENV,
  databaseUrl: data.DATABASE_URL,
  jwtSecret: data.JWT_SECRET,
  jwtExpiresIn: data.JWT_EXPIRES_IN,
  bcryptRounds: data.BCRYPT_ROUNDS,
  allowedOrigins: data.ALLOWED_ORIGINS,
  appName: data.APP_NAME,
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
