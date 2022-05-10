const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../services/salesService');
const SalesController = require('../../controllers/salesController');
const { OK_STATUS } = require('../../utils/statusCode');

describe('Ao chamar a função update do Controller', () => {
  describe('Se houver determinada venda no BD', () => {

    const response = {};
    const request = {};
    const payload = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    };
    
    before(() => {
      request.params = { id: 1 };
      request.body = [{ productId: 1, quantity: 6 }];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'update').resolves(payload)
    });

    after(() => SalesService.update.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(OK_STATUS)).to.be.equal(true);
    });

    it('é retornado o método "json" passando um objeto', async () => {
      await SalesController.update(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it(`tal objeto possui as propriedades 
    id, name e quantity do novo produto inserido`, async () => {
      await SalesController.update(request, response);

      expect(response.json.calledWith(sinon.match(payload))).to.be.equal(true);
    });
  })
})