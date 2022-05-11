const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/productsModel');

describe('Insere um novo produto no BD', () => {

  before(async () => {
    const payload = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(payload);
  });

  after(async () => {
    connection.execute.restore();
  });

   describe('quando é inserido com sucesso', () => {

     it('retorna um objeto', async () => {
       const response = await ProductsModel.create('produto', 10);

       expect(response).to.be.a('object');
     });

     it('tal objeto possui o "id" do novo produto inserido', async () => {
       const response = await ProductsModel.create('produto', 10);

       expect(response).to.have.a.property('id');
     });
   });
});