const Product = require('../models/Product')
const knex = require('../services/db')
const { Model } = require('objection')

Model.knex(knex)

class ProductsController {
  async getProductsByPage(req, res, next) {
    try {
      const { filters, searchText, page, sortByYear = '' } = req.body

      const itemPerPage = 18
      const currentPage = page - 1
      const itemsOffset = itemPerPage * currentPage
      const categories = filters?.categories.map((i) => `${i}`)
      const conditions = (builder) => {
        categories.length > 0 ? builder.whereIn('mastercategory', categories) : null
        searchText.length > 0
          ? builder.where('productdisplayname', 'ilike', `%${searchText}%`)
          : null
        builder.whereExists(Product.relatedQuery('images').whereNotNull('product_id'))
      }

      const allItemsCount = await Product.query().where(conditions).count().first()

      const products = await Product.query()
        .withGraphFetched('images')
        .where(conditions)
        .select('products.*')
        .orderBy('year', sortByYear === 'Year up' ? 'asc' : 'desc')
        .offset(itemsOffset)
        .limit(itemPerPage)

      res.json({
        products: products,
        page: parseInt(page, 10) ?? 0,
        pagesCount: Math.ceil(allItemsCount.count / itemPerPage),
      })
    } catch (err) {
      next(err)
    }
  }

  async getProductCategories(req, res, next) {
    try {
      const categories = await Product.query().distinct('mastercategory')

      res.json({
        categories: categories.map((i) => i.mastercategory),
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new ProductsController()
