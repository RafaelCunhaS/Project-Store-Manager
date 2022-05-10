const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../models/salesModel');
const SalesService = require('../../services/salesService');
const ProductsModel = require('../../models/productsModel');
const { UNPROCESSABLE_ENTITY } = require('../../utils/statusCode');

describe('Insere uma nova venda no BD', () => {

  describe('quando a quantidade inserida é maior que a quantidade disponível no BD', () => {

    const payload = [{ productId: 2, quantity: 11 }];

    const array = [{
      id: 1,
      name: 'produto A',
      quantity: 10
    }]

    before(async () => sinon.stub(ProductsModel, 'getById').returns(array));
  
    after(async () => ProductsModel.getById.restore());

    it('retorna um erro', async () => {
      const err = { status: UNPROCESSABLE_ENTITY, message: 'Such amount is not permitted to sell' };

      try {
        await SalesService.create(payload);
      } catch (error) {
        expect(error).to.be.deep.equal(err);
      }
    });
  });

  describe('quando é inserida com sucesso', () => {

    const payload = [{ productId: 2, quantity: 9 }];

    const array = [{
      id: 1,
      name: 'produto A',
      quantity: 10
    }]
  
    const obj = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }
  
    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves(array);
      sinon.stub(SalesModel, 'create').resolves(obj);
    });
  
    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.create(payload);

      expect(response).to.be.a('object');
    });

    it(`tal objeto possui o "id" da nova venda inserido e 
    um array ItemsSold com informações do(s) produto(s)`, async () => {
      const response = await SalesService.create(payload);

      expect(response).to.be.deep.equal(
          {
            id: 1,
            itemsSold: [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      });
    });
  });
});