const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Weather app APIs',
    version: '1.0.0',
    description: 'Weather app APIs for cowlar test',
  },
  tags: [
    {
      name: 'Auth',
      description: 'Operations related to user authentication',
    },
    {
      name: 'Weather',
      description: 'Operations related to Weather Data from InfluxDB',
    },
    { name: 'Users', description: 'CRUD operations on the Users' },
  ],
  components: {
    schemas: {
      WeatherData: {
        type: 'object',
        properties: {
          _time: {
            type: 'string',
            format: 'date-time',
            description: 'The timestamp of the weather data.',
          },
          city: {
            type: 'string',
            description: 'The name of the city.',
          },
          weather_condition: {
            type: 'string',
            description: 'The weather condition in the city.',
          },
          humidval: {
            type: 'integer',
            description: 'The humidity value in percentage.',
          },
          tempval: {
            type: 'integer',
            description: 'The temperature value in Celsius.',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier of the user.',
          },
          name: {
            type: 'string',
            description: 'The name of the user.',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'The email address of the user.',
          },
          phoneNumber: {
            type: 'string',
            description: 'The phone number of the user.',
          },
        },
        required: ['name', 'email', 'phoneNumber'],
      },
      InternalServerError: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          message: {
            type: 'string',
            description: 'Description of the error that occurred.',
            example: 'Internal Server Error',
          },
        },
      },
    },
  },
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
