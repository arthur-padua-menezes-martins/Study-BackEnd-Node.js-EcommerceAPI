export default {
  api: process.env.API ?? 'http://localhost:5050/api',
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/ecommerce-sertao-nerd',
  mongoUrlLocalhost: 'mongodb://localhost:27017',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.PORT ?? '7b205b22ff506a1f2fa12fea5da18c07',
  sendEmail: {
    from: 'suporte.sertaonerd@gmail.com',
    host: process.env.SEND_EMAIL_HOST ?? 'smtp.gmail.com',
    port: process.env.SEND_EMAIL_PORT ?? 465,
    secure: process.env.SEND_EMAIL_SECURE ?? true,
    auth: {
      user: process.env.SEND_EMAIL_AUTH_USER ?? 'arthur.software.developer@gmail.com',
      password: process.env.SEND_EMAIL_AUTH_PASS ?? 'software123456789'
    }
  },
  collections: {
    accounts: 'accounts',
    surveys: 'surveys',
    log: {
      error: 'errorLog'
    }
  }
}
