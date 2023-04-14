const db = require('../services/db')

class ProductController {
    async getProductsByPage(req, res) {
        const {filters, searchText, page = 0, sortByYear = ""} = req.body;
        const itemPerPage = 8;
        const itemsOffset = itemPerPage * page;
        const categories = filters?.categories.map((i) => '\'' + i + '\'');

        const selectProductsTemplate = (select, categories, searchText) => `
            SELECT ${select} FROM products
            JOIN product_images USING(product_id)
            WHERE 
                (${categories.length > 0 ? `mastercategory IN(${categories})` : 'TRUE'})
                AND (${searchText.length > 0 ? `productdisplayname LIKE('%${searchText}%')` : 'TRUE'})`;

        const products = await db.query(`
            ${selectProductsTemplate('*', categories, searchText)}
            ${sortByYear.length > 0 ? `ORDER BY year ${sortByYear === 'Year up' ? 'ASC' : 'DESC'}` : ''}
            OFFSET ${itemsOffset}
            LIMIT ${itemPerPage};
            `)

        const allItemsCount = await db.query(`${selectProductsTemplate('COUNT(*)', categories, searchText)};`);

        res.json({
            products: products.rows,
            page: (req?.query?.page ?? 0),
            itemsCount: allItemsCount.rows[0].count
        })
    }

    async getProductCategories(req, res) {
        const categories = await db.query(`
            SELECT DISTINCT(mastercategory)  FROM products
            JOIN product_images USING(product_id);
        `);

        res.json({
            categories: categories.rows.map((i) => i.mastercategory)
        })
    }


    async getOneProduct(req, res) {

    }

    async updateProduct(req, res) {

    }

    async deleteProduct(req, res) {

    }
}

module.exports = new ProductController()