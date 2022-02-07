const sinon = require("sinon");
const { expect } = require("chai");
const conn = require("../../models/connection");
const productModel = require("../../models/productsModel");

describe("Testes de produtos - model", () => {
  describe("Testa se é possivel criar um produto", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves([{ insertId: 1 }]);
    });

    after(() => {
      conn.execute.restore();
    });

    it('Testa se o produto criado tem a propriedade "id" ', async () => {
      const response = await productModel.create("sapato", 3);

      expect(response).to.have.a.property("id");
    });
  });

  describe("Testa se é possivel buscar um produto pelo nome ", () => {
    before(() => {
      sinon
        .stub(conn, "execute")
        .resolves([[{ id: 90, name: "blusa 1", quantity: 2 }]]);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se não existe o nome", async () => {
      const response = await productModel.getByName("blusa 2");
      // console.log(response);
      expect(response).to.have.property("name");
    });
  });

  describe("Testa se todos os produtos são retornados", () => {
    before(() => {
      const mock = [[
        { id: 2, name: "blusa 2", quantity: 10 },
        { id: 3, name: "blusa", quantity: 3 },
      ]];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se retorna um array", async () => {
      const resolve = await productModel.getAll();

      expect(resolve).to.be.an("array");
    });

    it("Testa se o array não está vazio", async () => {
      const response = await productModel.getAll();
      expect(response).to.be.not.empty;
    });

    it('Testa se o array possui as propriedades: "id", "name", e "quantity"', async () => {
      const [response] = await productModel.getAll();
      // console.log(response);
      expect(response).to.have.keys("id", "name", "quantity");
    });
  });

  describe("Testa se 'id' do produto existe ", () => {
    before(() => {
      sinon
        .stub(conn, "execute")
        .resolves([[{ id: 90, name: "blusa 1", quantity: 2 }]]);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se existe o id", async () => {
      const response = await productModel.getById(9);
      // console.log(response);
      expect(response).to.have.property("id");
    });
  });

  describe("Testa se produto foi atualizado", () => {
    before(() => {
      const mock = [{ id: 2, name: "blusa 2", quantity: 10 }];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se produto foi atualizado", async () => {
      const resolve = await productModel.update(1, 'meia', 9);

      expect(resolve).to.have.property('id');
    });

    it("Testa se retorna um object", async () => {
      const response = await productModel.update(7, 'luva', 4);
      expect(response).to.be.an('object');
    });
  });

  describe("Testa se 'id' do produto foi removido", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se foi deletado o produto do id", async () => {
      const response = await productModel.remove(3);
      // console.log(response);
      expect(response).to.be.true;
    });
  });
});
