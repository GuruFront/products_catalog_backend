const express = require('express')
const productRouter = require('./src/routes/product_routes')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

app.use(
  cors({
    origin: `${
      process.env.DEVELOPMENT
        ? 'http://localhost:3000'
        : 'https://products-catalog-frontend.vercel.app'
    }`,
  }),
)
app.use(express.json())
app.use('/api', productRouter)

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT)
})
