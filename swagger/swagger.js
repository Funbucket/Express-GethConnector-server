import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'unipicture API',
      description: 'unipicture Node.js Swaager API',
    },
    servers: [
      {
        url: 'http://localhost:5000', // 요청 URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

export { swaggerUi, specs };
