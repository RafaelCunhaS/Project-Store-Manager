const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');
const { NO_CONTENT } = require('../../../utils/statusCode');

describe('Ao chamar a função exclude do Controller', () => {
  describe('Se houver determinado produto no BD', () => {

    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'exclude').resolves()
    });

    after(() => ProductsService.exclude.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await ProductsController.exclude(request, response);

      expect(response.status.calledWith(NO_CONTENT)).to.be.equal(true);
    });

    it('nada é retornado', async () => {
      await ProductsController.exclude(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  })
})