const Router = require('express')
const router = new Router()
const userController = require('../controllers/Products.controller')

router.post('/products', userController.getProductsByPage)
router.get('/categories_list', userController.getProductCategories)

module.exports = router
