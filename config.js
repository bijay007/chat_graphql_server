const config = {
  defaultUser: 'Bijay',
  appName: 'chat_server',
  port: process.env.PORT || 4000,
  cors: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  langDefault: 'en-US'
}

export default config;
