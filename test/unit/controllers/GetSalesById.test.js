const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../../services/salesService');
const SalesController = require('../../../controllers/salesController');
const { OK_STATUS } = require('../../../utils/statusCode');

describe('Ao chamar a função getById do Controller', () => {
  describe('Se houver determinada venda no BD', () => {

    const response = {};
    const request = {};
    const payload = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];
    
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getById').resolves(payload)
    });

    after(() => SalesService.getById.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(OK_STATUS)).to.be.equal(true);
    });
    it('é retornado o método "json" passando um array', async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it('o array possui objetos', async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(sinon.match(payload))).to.be.equal(true);
    });
  })
})