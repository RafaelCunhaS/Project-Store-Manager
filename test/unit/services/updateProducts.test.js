const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/productsModel');
const { NOT_FOUND } = require('../../../utils/statusCode');

describe('Ao chamar a função update do model', () => {
  describe('Se não houver determinado produto no BD', () => {

    const payload = [];

    const payloadProduct = {
      id: 1,
      name: 'produto',
      quantity: 10,
    };
  
    before(() => sinon.stub(ProductsModel, 'getById').resolves(payload));
  
    after(() => ProductsModel.getById.restore());

    it('retorna um erro', async () => {
      try {
        await ProductsService.update(payloadProduct);
      } catch (error) {
        expect(error).to.be.deep.equal({ status: NOT_FOUND, message: 'Product not found' });
      }
    });
  })

  describe('Se houver determinado produto no BD', () => {

    const payload = {
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    };

    const payloadProduct = [{
      id: 1,
      name: 'produto',
      quantity: 10,
    }];

    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(payloadProduct);
      sinon.stub(ProductsModel, 'update').resolves(payload);
    });

    after(() => {
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
    });

    it('retorna um array', async () => {
      const result = await ProductsService.update(payload);

      expect(result).to.be.an('object');
    });

    it('o seu conteúdo não está vazio', async () => {
      const result = await ProductsService.update(payload);

      expect(result).to.not.be.empty;
    });

    it('o conteúdo do objeto contém os atributos id, name, quantity', async () => {
      const result = await ProductsService.update(payload);

      expect(result).to.includes.all.keys('id', 'name', 'quantity');
    });
  })
})