const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../models/productsModel");
const productService = require("../../services/productsServices");

//testes create
describe("first", () => {
  describe("Inserindo um novo produto no BD vias services", () => {
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

    it("Quando for sucesso, retorna produto", async () => {
      const product = await productService.createProductValid("blusa", 10);

      expect(product).to.include.all.keys("id", "name", "quantity");
    });

    it('', () => {
      ;
    });
    
  });


  //testes obter todos
  describe("consulta de todos os produtos do BD", () => {
    describe("quando não existe produto criado", () => {
      before(() => {
        sinon.stub(productModel, "getAll").resolves([]);
      });

      after(() => {
        productModel.getAll.restore();
      });

      it("retorna um array", async () => {
        const response = await productervice.getAll();

        expect(response).to.be.an("array");
      });

      it("retorna um array vazio", async () => {
        const response = await productervice.getAll();

        expect(response).to.be.empty;
      });
    });

    describe("quando existe produtos criados", () => {
      before(() => {
        sinon.stub(productModel, "getAll").resolves([
          {
            id: 1,
            name: "Blusa",
            quantity: 10,
          },
        ]);
      });

      after(() => {
        productModel.getAll.restore();
      });

      it("retorna um array", async () => {
        const response = await productervice.getAll();

        expect(response).to.be.an("array");
      });

      it("o array não está vazio", async () => {
        const response = await productervice.getAll();

        expect(response).to.be.not.empty; // empty === vazio
      });

      it('tais itens possui as propriedades: "id", "name", e "quantity"', async () => {
        const [item] = await productervice.getAll();

        expect(item).to.include.all.keys("id", "name", "quantity");
      });
    });
  });
});
describe('Product Service', () => {
  describe('Quando não tem produto', () => {
    before(async () => {
      const mock = [];
      sinon.stub(productModel, "getAll").resolves(mock)
    })

    after(productModel.getAll.restore());

      it('retorna um array', async() => {
        const products = await productModel.getAll();
        expect(products).to.be.an('array');
      });

      it('retorna um array vazio', async() => {
        const products = await productModel.getAll();
        expect(products).to.be.empty;
      });

  })

})
