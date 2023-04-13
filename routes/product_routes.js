const Router = require('express')
const router = new Router();
const userController = require('../controllers/product.controller')

router.post('/products', userController.getProductsByPage)
router.get('/categories_list', userController.getProductCategories)
router.get('/product/:id', userController.getOneProduct)
router.put('/product/:id', userController.updateProduct)
router.delete('/product/:id', userController.deleteProduct)

module.exports = router