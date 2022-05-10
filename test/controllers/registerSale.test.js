const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../services/salesService');
const SalesController = require('../../controllers/salesController');
const { CREATED } = require('../../utils/statusCode');

describe('Ao chamar a função create do Controller', () => {
  describe('Se houver determinada venda no BD', () => {

    const response = {};
    const request = {};
    const salePayload = [
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
      request.body = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'create').resolves(salePayload)
    });

    after(() => SalesService.create.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(CREATED)).to.be.equal(true);
    });

    it('é retornado o método "json" passando um array', async () => {
      await SalesController.create(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('o array possui objetos com as informações dos produtos', async () => {
      await SalesController.create(request, response);

      expect(response.json.calledWith(sinon.match(salePayload))).to.be.equal(true);
    });
  })
})