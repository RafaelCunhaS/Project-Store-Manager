const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../services/salesService');
const SalesController = require('../../controllers/salesController');
const { OK_STATUS } = require('../../utils/statusCode');

describe('Ao chamar a função getAll do Controller', () => {
  describe('Se não houver vendas no BD', () => {

    const response = {};
    const request = {};
    const payload = [];
  
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getAll').resolves(payload)
    });
  
    after(() => SalesService.getAll.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(OK_STATUS)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um array', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('Se houver vendas no BD', () => {

    const response = {};
    const request = {};
    const payload = [{
      saleId: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2
    }]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getAll').resolves(payload)
    });

    after(() => SalesService.getAll.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(OK_STATUS)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um array', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it('o array possui objetos', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match(payload))).to.be.equal(true);
    });
  })
})