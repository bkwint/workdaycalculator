import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const initializeSwagger = (app: Express) => {
  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'WorkDayCalculator',
        version: '1.0.0',
      },
    },
    apis: ['./src/middleware/registerRoutes.ts'], // files containing annotations as above
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default initializeSwagger;
