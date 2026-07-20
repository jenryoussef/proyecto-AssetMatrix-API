import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'AssetMatrix API',
    version: '1.0.0',
    description: 'API para la gestion y analisis de activos financieros',
    },
    servers: [
    {
    url: 'http://localhost:3000',
    description: 'Servidor de Desarrollo'
    }
    ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
