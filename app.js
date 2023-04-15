const express = require('express');
const productRouter = require('./routes/product_routes')
 const cors = require('cors');


const PORT = process.env.PORT || 8080

const app = express();


app.use(cors({
    origin: 'https://product-catalog-front-git-main-ruslangunder-gmailcom.vercel.app'
    //origin: 'http://localhost:3000'
}));


app.use(express.json())
app.use('/api', productRouter)


app.listen(PORT, () => {
    console.log('Server started on port: ', PORT)
})

