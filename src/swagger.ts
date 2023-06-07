export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'your description here',
    termsOfService: '',
    contact: {
      name: 'ILHAM ASGARLI',
      email: 'ilhamasgarli19@gmail.com',
      url: 'https://www.ideosphere.com.tr',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  tags: [
    {
      name: 'Auth',
    },
  ],
  /*paths: {
    '/auth/sign-in': {
      post: ,
    },
  },*/
  servers: [
    {
      url: 'http://localhost:3000/v1',
      description: 'Local server',
    },
    {
      url: 'https://api.ideosphere.com.tr/v1',
      description: 'Production Env',
    },
  ],
};