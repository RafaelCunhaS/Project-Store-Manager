const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../services/productsService');
const ProductsController = require('../../controllers/productsController');
const { OK_STATUS } = require('../../utils/statusCode');

describe('Ao chamar a função getById do Controller', () => {
  describe('Se houver produtos no BD', () => {

    const response = {};
    const request = {};
    const payload = [{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }]

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getById').resolves(payload)
    });

    after(() => ProductsService.getById.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(OK_STATUS)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um objeto', async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
    it('o objeto possui as propriedades e valores esperados', async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match(payload[0]))).to.be.equal(true);
    });
  })
})