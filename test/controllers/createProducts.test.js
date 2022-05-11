const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../services/productsService');
const ProductsController = require('../../controllers/productsController');
const { CREATED } = require('../../utils/statusCode');

describe('Ao chamar a função create do Controller', () => {
  describe('Quando o produto é inserido corretamente no BD', () => {

    const response = {};
    const request = {};
    const payload = {
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }

    before(() => {
      request.body = {
        name: 'Armadura do Homem de Ferro',
        quantity: 5,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'create').resolves(payload)
    });

    after(() => ProductsService.create.restore());

    it('é retornado o método "status" passando o código 201', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(CREATED)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um objeto', async () => {
      await ProductsController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
    it('o objeto possui as propriedades e valores esperados', async () => {
      await ProductsController.create(request, response);

      expect(response.json.calledWith(sinon.match(payload))).to.be.equal(true);
    });
  })
})