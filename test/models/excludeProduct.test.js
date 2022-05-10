const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/productsModel');

describe('Ao chamar a função exclude do model', () => {
  describe('Se houver determinado produto no BD', () => {

    const id = 1;

    before(() => sinon.stub(connection, 'execute').resolves());

    after(() => connection.execute.restore());

    it('nada é retornado', async () => {
      const result = await ProductsModel.exclude(id);

      expect(result).to.be.undefined;
    });
  })
})