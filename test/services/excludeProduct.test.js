const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../services/productsService');
const ProductsModel = require('../../models/productsModel');
const { NOT_FOUND } = require('../../utils/statusCode');

describe('Ao chamar a função exclude do model', () => {
  describe('Se não houver determinado produto no BD', () => {

    const payload = [];

    const id = 1;
  
    before(() => sinon.stub(ProductsModel, 'getById').resolves(payload));
  
    after(() => ProductsModel.getById.restore());

    it('retorna um erro', async () => {
      try {
        await ProductsService.exclude(id);
      } catch (error) {
        expect(error).to.be.deep.equal({ status: NOT_FOUND, message: 'Product not found' });
      }
    });
  })

  describe('Se houver determinado produto no BD', () => {

    const payload = [{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }];

    const id = 1;

    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(payload)
      sinon.stub(ProductsModel, 'exclude').resolves()
    });

    after(() => {
      ProductsModel.getById.restore()
      ProductsModel.exclude.restore()
    });

    it('nada é retornado', async () => {
      const result = await ProductsService.exclude(id);

      expect(result).to.be.undefined;
    });
  })
})