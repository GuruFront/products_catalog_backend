const Product = require('../models/Product')
const knex = require('../services/db')
const { Model } = require('objection')
const onError = require('../utils/onError')

Model.knex(knex)

class ProductController {
  async getProductsByPage(req, res) {
    try {
      const { filters, searchText, page, sortByYear = '' } = req.body

      if (typeof page === 'undefined') throw new onError(404, 'Page is required')

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
    } catch (error) {
      res.status(404).json({
        products: [],
        page: 0,
        pagesCount: 0,
      })
    }
  }

  async getProductCategories(req, res) {
    const categories = await Product.query().distinct('mastercategory')

    res.json({
      categories: categories.map((i) => i.mastercategory),
    })
  }
}

module.exports = new ProductController()
