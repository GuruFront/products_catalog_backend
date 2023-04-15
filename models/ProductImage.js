const { Model } = require('objection');

class ProductImage extends Model {
    static get tableName() {
        return 'product_images';
    }
}

module.exports = ProductImage;