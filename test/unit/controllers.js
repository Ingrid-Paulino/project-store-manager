const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../services/productsServices');
const productController = require('../../controllers/productsController');


describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Blusa',
        quantity: 10
      }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response);

      sinon.stub(productService, 'createProductValid').resolves({ id: 1, name: 'blusa 1', quantity: 6 });
    })

    after(() => {
      productService.createProductValid.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com um objeto', async () => {
      await productController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });


  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response);

      sinon.stub(productService, 'getAllProducts').resolves({ id: 1, name: 'blusa 1', quantity: 6 });
    })

    after(() => {
      productService.getAllProducts.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um objeto', async () => {
      await productController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    // it("não chama o res.send", async () => {
    //     await productController.getAll(request, response)
    //     expect(response.send.calledOnce()).to.be.false
    //   })
  });



  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
        request.params = {
            id: 1
          }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response);

      sinon.stub(productService, 'getIdProduct').resolves({ id: 1, name: 'blusa 1', quantity: 6 });
    })

    after(() => {
      productService.getIdProduct.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productController.getId(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um objeto', async () => {
      await productController.getId(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });





  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
        request.params = {
            id: 1
          }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.send = sinon.stub().returns(response);

      sinon.stub(productService, 'updateProduct').resolves({ id: 1, name: 'blusa 1', quantity: 6 });
    })

    after(() => {
      productService.updateProduct.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productController.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um objeto', async () => {
      await productController.updateProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    // it("não chama o res.send", async () => {
    //     await productController.updateProduct(request, response)
    //     expect(response.send.calledOnce()).to.be.false
    //   })
  });


