import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo OpenAPI YAML
const openapiPath = join(__dirname, '..', 'openapi.yaml');
const file = readFileSync(openapiPath, 'utf8');
const swaggerDocument = YAML.parse(file);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'AgroTech API Documentation'
  }));

  console.log('📚 Swagger UI disponible en: http://localhost:3000/api-docs');
}
