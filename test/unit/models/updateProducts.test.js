const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('Atualiza determinado produto no BD', () => {

  const payloadProduct = {
     id: 1,
     name: 'produto',
     quantity: 10,
  };

  before(async () => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(async () => {
    connection.execute.restore();
  });

   describe('quando é atualizado com sucesso', () => {

     it('retorna um objeto', async () => {
       const response = await ProductsModel.update(1, 'produto', 10);

       expect(response).to.be.a('object');
     });

     it(`tal objeto possui as propriedades 
     id, name e quantity do novo produto inserido`, async () => {
       const response = await ProductsModel.update(1, 'produto', 10);

       expect(response).to.be.deep.equal(payloadProduct);
     });
   });
});