export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/ecommerce-sertao-nerd',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? '7b205b22ff506a1f2fa12fea5da18c07'
}
