FROM node:20-alpine AS deps

# Instalar pnpm via corepack (incluido en Node.js 20)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar manifests PRIMERO (aprovechar caché de capas)
COPY package.json pnpm-lock.yaml* ./

# Instalar solo dependencias de producción
RUN pnpm install --frozen-lockfile --prod

# ---- Stage final ----
FROM node:20-alpine AS final

WORKDIR /app

# Copiar dependencias instaladas
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente
COPY src/ ./src/
COPY package.json ./

# Metadatos de la imagen
LABEL org.opencontainers.image.title="AgroTech API"
LABEL org.opencontainers.image.description="API REST de Sistema Integrador AgroTech"

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Correr como usuario no-root
USER node

CMD ["node", "src/server.js"]
