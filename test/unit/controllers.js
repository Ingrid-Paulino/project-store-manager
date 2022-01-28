const sinon = require('sinon');
const { expect } = require('chai');
const productController = require('../../controllers/createController')
const productService = require('../../services/productervice');

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

    sinon.stub(productService, 'create')
        .resolves(false);
    });

    after(() => {
      productService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await productController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Blusa',
        quantity: 10
      }

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productService, 'create')
        .resolves(true);
    })

    after(() => {
      productService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
      await productController.create(request, response);

      expect(response.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
    });

  });
});

describe("Ao chamar o controller de getAll", () => {
  describe("quando não existem produtos no banco de dados", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").resolves([]);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});