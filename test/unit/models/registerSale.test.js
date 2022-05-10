const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('Insere uma nova venda no BD', () => {

  describe('quando é inserida com sucesso', () => {

    const id = [{ insertId: 1 }];
  
    const array = [
      {
        productId: 1,
        quantity: 3
      }
    ];
  
    before(async () => {
      sinon.stub(connection, 'execute').resolves(id);
      sinon.stub(SalesModel, 'createSalesProducts').resolves();
    });
  
    after(async () => {
      connection.execute.restore();
      SalesModel.createSalesProducts.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesModel.create(array);

      expect(response).to.be.a('object');
    });

    it(`tal objeto possui o "id" do novo produto inserido e 
    um array ItemsSold com informações do produto`, async () => {
      const response = await SalesModel.create(array);

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