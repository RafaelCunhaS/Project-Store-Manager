const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const SalesModel = require('../../models/salesModel');

describe('Ao chamar a função exclude do model', () => {
  describe('Se houver determinada venda no BD', () => {

    const salePayload = [[
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ]];

    const id = 1;
  
    before(() => {
      sinon.stub(connection, 'execute').onFirstCall().resolves(salePayload)
        .onSecondCall().resolves();
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('nada é retornado', async () => {
      const result = await SalesModel.exclude(id);

      expect(result).to.be.undefined;
    });
  })
})