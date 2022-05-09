const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');
const { NOT_FOUND } = require('../../../utils/statusCode');

describe('Ao chamar a função getById do service', () => {
  describe('Se não houver determinada venda no BD', () => {

    const payload = [];

    const id = 1;
  
    before(() => {
      sinon.stub(SalesModel, 'getById').returns(payload)
    });
  
    after(() => SalesModel.getById.restore());

    it('retorna um erro', async () => {
      try {
        await SalesService.getById(id);
      } catch (error) {
        expect(error).to.be.deep.equal({ status: NOT_FOUND, message: 'Sale not found' });
      }
    })
  })

  describe('Se houver determinada venda no BD', () => {

    const payload = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    const id = 1;

    before(() => sinon.stub(SalesModel, 'getById').resolves(payload));

    after(() => SalesModel.getById.restore());

    it('retorna um array', async () => {
      const result = await SalesService.getById(id);

      expect(result).to.be.an('array');
    });
    it('o seu conteúdo não está vazio', async () => {
      const result = await SalesService.getById(id);

      expect(result).to.not.be.empty;
    });
    it('o array possui objetos', async () => {
      const [result] = await SalesService.getById(id);

      expect(result).to.be.an('object');
    });
    it('o conteúdo do objeto contém os atributos date, productId, quantity', async () => {
      const [result] = await SalesService.getById(id);

      expect(result).to.includes.all.keys('date', 'productId', 'quantity');
    })
  })
})