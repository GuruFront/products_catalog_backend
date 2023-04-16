const Router = require('express')
const router = new Router();
const userController = require('../controllers/product.controller')

router.post('/products', userController.getProductsByPage)
router.get('/categories_list', userController.getProductCategories)

//TODO remove it from product_routes
router.get('/', (req, res)=> res.json({
    server: 'works',
}));

module.exports = router