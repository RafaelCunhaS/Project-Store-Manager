const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');
const { NOT_FOUND } = require('../../../utils/statusCode');

describe('Ao chamar a função update do service', () => {
  describe('Se não houver determinada venda no BD', () => {

    const payload = [];
  
    before(() => {
      sinon.stub(SalesModel, 'getById').returns(payload)
    });
  
    after(() => SalesModel.getById.restore());

    it('retorna um erro', async () => {
      try {
        await SalesService.update(1, 1, 6);
      } catch (error) {
        expect(error).to.be.deep.equal({ status: NOT_FOUND, message: 'Sale not found' });
      }
    })
  })

  describe('Se houver determinada venda no BD', () => {

    const payload = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    };

    const SalePayload = [{
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }];

    before(() => {
      sinon.stub(SalesModel, 'getById').returns(SalePayload)
      sinon.stub(SalesModel, 'update').resolves(payload)
    });

    after(() => {
      SalesModel.getById.restore();
      SalesModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const result = await SalesService.update(1, 1, 6);

      expect(result).to.be.an('object');
    });

    it('o seu conteúdo não está vazio', async () => {
      const result = await SalesService.update(1, 1, 6);

      expect(result).to.not.be.empty;
    });

    it(`tal objeto possui as propriedades 
    id, name e quantity do novo produto inserido`, async () => {
      const result = await SalesService.update(1, 1, 6);

      expect(result).to.be.deep.equal(payload);
    });
  })
})