const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/productsModel');

describe('Ao chamar a função getAll do Service', () => {
  describe('Se não houver produtos no BD', () => {

    const payload = [];
  
    before(() => sinon.stub(ProductsModel, 'getAll').resolves(payload));
  
    after(() => ProductsModel.getAll.restore());

    it('retorna um array', async () => {
      const result = await ProductsService.getAll();

      expect(result).to.be.an('array');
    })
    it('e seu conteúdo está vazio', async () => {
      const result = await ProductsService.getAll();

      expect(result).to.be.empty;
    })
  })

  describe('Se houver produtos no BD', () => {

    const payload = [{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }]

    before(() => sinon.stub(ProductsModel, 'getAll').resolves(payload));

    after(() => ProductsModel.getAll.restore());

    it('retorna um array', async () => {
      const result = await ProductsService.getAll();

      expect(result).to.be.an('array');
    });
    it('o seu conteúdo não está vazio', async () => {
      const result = await ProductsService.getAll();

      expect(result).to.not.be.empty;
    });
    it('o array possui objetos', async () => {
      const [result] = await ProductsService.getAll();

      expect(result).to.be.an('object');
    });
    it('o conteúdo do objeto contém os atributos id, name, quantity', async () => {
      const [result] = await ProductsService.getAll();

      expect(result).to.includes.all.keys('id', 'name', 'quantity');
    })
  })
})