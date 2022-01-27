const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../models/connection')
const productModel = require('../../models/productsModel')

describe('Insere um novo produto no BD', () => {

  //chaves que tera no obj criado
  const payloadProduct = {
    name: 'Blusa',
    quantity: 10,
  }

  //mocando
  before(async () => {
    const execute = [{ insertId: 1}] // retorno esperado nesse teste

    sinon.stub(conn, 'execute').resolves(execute);
  })

  // Restauraremos a função `execute` original após os testes.
  after(async () => {
    conn.execute.restore();
  })

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.be.a('object')
    });


    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    });

  });
});