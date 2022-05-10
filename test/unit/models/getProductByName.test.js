const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('Ao chamar a função getByName do model', () => {
  describe('Se não houver determinado produto no BD', () => {

    const payload = [[]];

    const name = 'produto';
  
    before(() => sinon.stub(connection, 'execute').resolves(payload));
  
    after(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await ProductsModel.getByName(name);

      expect(result).to.be.an('array');
    });

    it('e seu conteúdo está vazio', async () => {
      const result = await ProductsModel.getByName(name);

      expect(result).to.be.empty;
    });
  })

  describe('Se houver determinado produto no BD', () => {

    const payload = [[{
      id: 1,
      name: 'Armadura do Homem de Ferro',
      quantity: 5
    }]]

    const name = 'Armadura do Homem de Ferro';

    before(() => sinon.stub(connection, 'execute').resolves(payload));

    after(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await ProductsModel.getByName(name);

      expect(result).to.be.an('array');
    });

    it('o seu conteúdo não está vazio', async () => {
      const result = await ProductsModel.getByName(name);

      expect(result).to.not.be.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await ProductsModel.getByName(name);

      expect(result).to.be.an('object');
    });

    it('o conteúdo do objeto contém os atributos id, name, quantity', async () => {
      const [result] = await ProductsModel.getByName(name);

      expect(result).to.includes.all.keys('id', 'name', 'quantity');
    });
  })
})