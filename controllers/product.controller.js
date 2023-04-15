const Product = require('../models/Product');
const knex = require("../services/db");
const {Model} = require("objection");

Model.knex(knex);

class ProductController {
    async getProductsByPage(req, res) {
        const {filters, searchText, page = 0, sortByYear = ''} = req.body;
        const itemPerPage = 8;
        const itemsOffset = itemPerPage * page;
        const categories = filters?.categories.map((i) => `${i}`);

        const conditions = (builder) => {
            categories.length > 0 ? builder.whereIn('mastercategory', categories) : null
            searchText.length > 0 ? builder.where('productdisplayname', 'ilike', `%${searchText}%`) : null
            builder.whereExists(Product.relatedQuery('images').whereNotNull('product_id'))
        }

        const allItemsCount = await Product.query().where(conditions).count().first();


        const products = await Product.query()
            .withGraphFetched('images')
            .where(conditions)
            .select('products.*')
            .orderBy('year', sortByYear === 'Year up' ? 'asc' : 'desc')
            .offset(itemsOffset)
            .limit(itemPerPage);


        res.json({
            products: products,
            page: req?.query?.page ?? 0,
            itemsCount: allItemsCount.count,
        });
    }

    async getProductCategories(req, res) {
        const categories = await Product.query().distinct('mastercategory')

        res.json({
            categories: categories.map((i) => i.mastercategory),
        });
    }
}

module.exports = new ProductController();