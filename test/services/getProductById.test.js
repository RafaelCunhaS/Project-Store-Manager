const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../services/productsService');
const ProductsModel = require('../../models/productsModel');
const { NOT_FOUND } = require('../../utils/statusCode');

describe('Ao chamar a função getById do model', () => {
  describe('Se não houver determinado produto no BD', () => {

    const payload = [];

    const id = 1;
  
    before(() => sinon.stub(ProductsModel, 'getById').resolves(payload));
  
    after(() => ProductsModel.getById.restore());

    it('retorna um erro', async () => {
      try {
        await ProductsService.getById(id);
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

    before(() => sinon.stub(ProductsModel, 'getById').resolves(payload));

    after(() => ProductsModel.getById.restore());

    it('retorna um array', async () => {
      const result = await ProductsService.getById(id);

      expect(result).to.be.an('array');
    });

    it('o seu conteúdo não está vazio', async () => {
      const result = await ProductsService.getById(id);

      expect(result).to.not.be.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await ProductsService.getById(id);

      expect(result).to.be.an('object');
    });

    it('o conteúdo do objeto contém os atributos id, name, quantity', async () => {
      const [result] = await ProductsService.getById(id);

      expect(result).to.includes.all.keys('id', 'name', 'quantity');
    });
  })
})