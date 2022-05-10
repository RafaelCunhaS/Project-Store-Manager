const { expect } = require('chai');
const sinon = require('sinon');
const SalesService = require('../../../services/salesService');
const SalesController = require('../../../controllers/salesController');
const { NO_CONTENT } = require('../../../utils/statusCode');

describe('Ao chamar a função exclude do Controller', () => {
  describe('Se houver determinada venda no BD', () => {

    const response = {};
    const request = {};
    
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'exclude').resolves()
    });

    after(() => SalesService.exclude.restore());

    it('é retornado o método "status" passando o código 200', async () => {
      await SalesController.exclude(request, response);

      expect(response.status.calledWith(NO_CONTENT)).to.be.equal(true);
    });

    it('nada é retornado', async () => {
      await SalesController.exclude(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  })
})