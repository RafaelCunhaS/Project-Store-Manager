const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Ao chamar a função getAll do Controller', () => {
  describe('Se não houver produtos no BD', () => {

    const response = {};
    const request = {};
    const payload = [];
  
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAll').resolves(payload)
    });
  
    after(() => ProductsService.getAll.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um array', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('Se houver produtos no BD', () => {

    const response = {};
    const request = {};
    const payload = [{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAll').resolves(payload)
    });

    after(() => ProductsService.getAll.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um array', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it('o array possui objetos', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match(payload))).to.be.equal(true);
    });
  })
})