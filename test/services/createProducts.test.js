const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../models/productsModel');
const ProductsService = require('../../services/productsService');
const { CONFLICT } = require('../../utils/statusCode');

describe('Insere um novo produto no BD', () => {
  describe('quando o nome do produto já existe no BD', () => {

    const payload = [[{ name: 'produto', quantity: 10 }]];

    before(async () => {  
      sinon.stub(ProductsModel, 'getByName').returns(payload);
    });
  
    after(async () => ProductsModel.getByName.restore());

    it('retorna um erro', async () => {
      try {
        await ProductsService.create('produto', 10);
      } catch (error) {
        expect(error).to.be.deep.equal({ status: CONFLICT, message: 'Product already exists' });
      }
    });
  });

  describe('quando é inserido com sucesso', () => {

     const payloadProduct = {
        name: 'produto',
        quantity: 10,
     };
   
     before(async () => {
      const payload = { 
        id: 11,
        name: 'produto',
        quantity: 10,
       };

      const returnedArray = [];
      
      sinon.stub(ProductsModel, 'getByName').returns(returnedArray);
      sinon.stub(ProductsModel, 'create').resolves(payload);
     });
   
     after(async () => {
       ProductsModel.getByName.restore();
       ProductsModel.create.restore();
      });

     it('retorna um objeto', async () => {
       const response = await ProductsService.create(payloadProduct);

       expect(response).to.be.a('object');
     });

     it('tal objeto possui o "id" do novo produto inserido', async () => {
       const response = await ProductsService.create(payloadProduct);

       expect(response).to.have.a.property('id');
     });
   });
});