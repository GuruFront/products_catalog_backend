const {Model} = require('objection');
const ProductImage = require("./ProductImage");

class Product extends Model {
    static get tableName() {
        return 'products';
    }

    static get relationMappings() {
        return {
            images: {
                relation: Model.HasManyRelation,
                modelClass: ProductImage,
                join: {
                    from: 'products.product_id',
                    to: 'product_images.product_id'
                }
            }
        };
    }
}

module.exports = Product;