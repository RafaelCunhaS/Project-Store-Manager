const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');

describe('Insere uma nova venda no BD', () => {

  describe('quando é inserida com sucesso', () => {

    const id = [{ insertId: 1 }];
  
    const array = [
      {
        productId: 1,
        quantity: 3
      }
    ];

    const getByIdPayload = {
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    };

    const updatePayload = {
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 2
    };

    const promisePayload = [[{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }]];
  
    before(async () => {
      sinon.stub(connection, 'execute').resolves(id);
      sinon.stub(SalesModel, 'createSalesProducts').resolves();
      sinon.stub(ProductsModel, 'getById').resolves(getByIdPayload);
      sinon.stub(ProductsModel, 'update').resolves(updatePayload);
      sinon.stub(Promise, 'all').resolves(promisePayload);
    });
  
    after(async () => {
      connection.execute.restore();
      SalesModel.createSalesProducts.restore();
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
      Promise.all.restore();
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