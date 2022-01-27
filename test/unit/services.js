const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../models/productsModel')
const productService = require('../../services/movieService');

describe('Insere um novo produto no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {};

    it('retorna um boolean', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      name: 'Blusa',
      quantity: 10,
    }

    //mocando
    before(async () => {
      const ID_EXAMPLE = 1;

      sinon.stub(productModel, 'create').resolves({ id: ID_EXAMPLE });
    })

    // Restauraremos a função `execute` original após os testes.
    after(async () => {
      productModel.create.restore();
    })
  
    it('retorna um objeto', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });
});