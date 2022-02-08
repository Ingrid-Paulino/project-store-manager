const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../models/productsModel");
const productService = require("../../services/productsServices");

// const salesService = require("../../services/salesService");
// const salesModel = require("../../models/salesModel");



describe("Testes de produtos - service", () => {

  describe("Testa se é possivel criar um produto", () => {
    before(() => {
      sinon.stub(productModel, "getByName").resolves(false);

      sinon
        .stub(productModel, "create")
        .resolves({ id: 1, name: "blusa", quantity: 3 });
    });

    after(() => {
      productModel.getByName.restore();
      productModel.create.restore();
    });

    it('Testa se o produto criado tem a propriedade "id" ', async () => {
        const response = await productService.createProductValid("sapato", 3);
  
        expect(response).to.have.a.property("id");
      });

    it("Quando for sucesso, retorna produto", async () => {
      const response = await productService.createProductValid("blusa", 10);

      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });


  

    describe("Testa que não é possivel criar um produto que ja existe", () => {
      before(() => {
        sinon.stub(productModel, "getByName").resolves(true);
      });
  
      after(() => {
        productModel.getByName.restore();
      });
  
      it('Retorna mensagem e status de erro', async () => {
          const response = await productService.createProductValid("sapato", 3);
    
          expect(response).to.have.all.keys(["status", "message"]);
        });
      });
   



  describe("Testa se 'id' do produto existe ", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves({ id: 2, name: 'blusa 2', quantity: 10 });
    });

    after(() => {
        productModel.getById.restore();
    });

    it("Testa se existe o id", async () => {
      const response = await productService.getIdProduct(3);
      // console.log(response);
      expect(response).to.have.property('id');
      expect(response).to.be.an('object');

    });
  });


  describe("Testa se produto foi atualizado", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves({ id: 2, name: 'blusa 2', quantity: 10 });

      sinon.stub(productModel, "update").resolves({ id: '4', name: 'blusa 55', quantity: 40 });
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se produto foi atualizado", async () => {
      const resolve = await productService.updateProduct(1, "meia", 9);

      expect(resolve).to.have.property("id");
    });

    it("Testa se retorna um object", async () => {
      const response = await productModel.update(7, "luva", 4);
      expect(response).to.be.an("object");
    });
  });


  describe("Testa se 'id' do produto foi removido", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves({ id: 2, name: 'blusa 2', quantity: 10 });

      sinon.stub(productModel, "remove").resolves();
    });

    after(() => {
      sinon.restore();
    });


    it("Testa se existe o id", async () => {
      const response = await productService.removeProduct(3);
      // console.log(response);
      expect(response).to.have.property("id");
      expect(response).to.be.an("object")
    });
  });
});







// describe("Testes de produtos - service", () => {

//   describe("Testa se é possivel criar uma venda", () => {
//     before(() => {
//       sinon.stub(salesModel, "create").resolves([{ id: 6 [ { product_id: 3, quantity: 4 }] }]);
//     });

//     after(() => {
//       salesModel.create.restore();
//     });

//     it('Testa se o produto criado tem a propriedade "id" ', async () => {
//         const response = await productService.create(itensSold);
  
//         expect(response).to.have.a.property("id");
//       });

//     it("Quando for sucesso, retorna produto", async () => {
//       const response = await productService.create(itensSold);

//       expect(response).to.include.all.keys("id", "product_id", "quantity");
//     });
//   });

//   describe("Testa se 'id' do produto existe ", () => {
//     before(() => {
//       sinon.stub(salesModel, "getIdSales").resolves({ id: 2, name: 'blusa 2', quantity: 10 });
//     });

//     after(() => {
//         salesModel.getById.restore();
//     });

//     it("Testa se existe o id", async () => {
//       const response = await productService.getIdProduct(3);
//       // console.log(response);
//       expect(response).to.have.property('id');
//       expect(response).to.be.an('object');

//     });
//   });


//   describe("Testa se produto foi atualizado", () => {
//     before(() => {
//       sinon.stub(salesModel, "getById").resolves({ id: 2, name: 'blusa 2', quantity: 10 });

//       sinon.stub(salesModel, "update").resolves({ id: '4', name: 'blusa 55', quantity: 40 });
//     });

//     after(() => {
//       sinon.restore();
//     });

//     it("Testa se produto foi atualizado", async () => {
//       const resolve = await productService.updateProduct(1, "meia", 9);

//       expect(resolve).to.have.property("id");
//     });

//     it("Testa se retorna um object", async () => {
//       const response = await salesModel.update(7, "luva", 4);
//       expect(response).to.be.an("object");
//     });
//   });


//   describe("Testa se 'id' da venda foi removido", () => {
//     before(() => {
//       sinon.stub(salesModel, "getById").resolves({ id: 2, name: 'blusa 2', quantity: 10 });

//       sinon.stub(salesModel, "remove").resolves();
//     });

//     after(() => {
//       sinon.restore();
//     });


//     it("Testa se existe o id", async () => {
//       const response = await productService.removeProduct(3);
//       // console.log(response);
//       expect(response).to.have.property("id");
//       expect(response).to.be.an("object")
//     });
//   });
// });
