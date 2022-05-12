const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const SalesModel = require('../../models/salesModel');
const ProductsModel = require('../../models/productsModel');

describe('Ao chamar a função update do model', () => {
  describe('Se houver determinada venda no BD', () => {

    const getByIdPayload = [{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 10
    }]

    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(getByIdPayload);
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      ProductsModel.getById.restore();
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const result = await SalesModel.update(1, 1, 6);

      expect(result).to.be.an('object');
    });

    it('o seu conteúdo não está vazio', async () => {
      const result = await SalesModel.update(1, 1, 6);

      expect(result).to.not.be.empty;
    });

    it('o conteúdo do objeto contém os atributos date, productId, quantity e a estrutura correta', async () => {
      const obj = {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      };
      const result = await SalesModel.update(1, 1, 6);

      expect(result).to.be.deep.equal(obj);
    })
  })
})
