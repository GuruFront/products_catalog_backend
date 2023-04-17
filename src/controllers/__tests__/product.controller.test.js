const ProductController = require('../product.controller')

jest.mock('../../models/Product')

describe('ProductController', () => {
  describe('getProductsByPage', () => {
    it('should throw an error if page is undefined', async () => {
      const req = { body: {} }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      await ProductController.getProductsByPage(req, res)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ products: [], page: 0, pagesCount: 0 })
    })

    // it('should return products, page and pagesCount', async () => {
    //     //   TODO test
    // });
  })

  // describe('getProductCategories', () => {
  //     it('should return categories', async () => {
  //         //   TODO test
  //     });
  // });
})
