const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');

describe('Ao chamar a função exclude do model', () => {
  describe('Se houver determinada venda no BD', () => {

    const salePayload = [[
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ]];

    const productPayload = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    const productUpdated = {
      "id": 1,
      "name": "produto A",
      "quantity": 12
    };

    const promisePayload = [[{
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }]];

    const id = 1;
  
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(productPayload);
      sinon.stub(ProductsModel, 'update').resolves(productUpdated);
      sinon.stub(Promise, 'all').resolves(promisePayload)
      sinon.stub(connection, 'execute').onFirstCall().resolves(salePayload)
        .onSecondCall().resolves();
    });
  
    after(() => {
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
      Promise.all.restore();
      connection.execute.restore();
    });

    it('nada é retornado', async () => {
      const result = await SalesModel.exclude(id);

      expect(result).to.be.undefined;
    });
  })
})