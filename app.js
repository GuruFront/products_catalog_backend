const express = require('express')
const productRouter = require('./src/routes/product_routes')
const cors = require('cors')
const errorHandler = require('./src/middlewares/errorHandler')

const PORT = process.env.PORT || 8080

const app = express()

app.use(errorHandler)

app.use(
  cors({
    origin: `${process.env.HOST}`,
  }),
)
app.use(express.json())
app.use('/api', productRouter)

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT)
})
