const sinon = require("sinon");
const { expect } = require("chai");
const conn = require("../../models/connection");
const productModel = require("../../models/productsModel");
const salesModel = require("../../models/salesModel");


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








describe("Testes de sales - model", () => {
  describe("Testa se é possivel criar uma venda", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves([{ insertId: 1 }]);
    });

    after(() => {
      conn.execute.restore();
    });

    it('Testa se o produto criado tem a propriedade "id" ', async () => {
      const response = await salesModel.createSale();

      expect(response).to.have.a.property("id");
    });
  });


  describe("Testa se é possivel criar uma venda de produtos", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves([{ id: 6 [ { product_id: 3, quantity: 4 }] }]);
    });

    after(() => {
      conn.execute.restore();
    });

    it('Testa se o produto criado tem a propriedade "id" ', async () => {
      const response = await salesModel.create([ { product_id: 4, quantity: 4 }]);

      expect(response).to.have.a.property("id");
    });
  });

  describe("Testa se todas as vendas são retornados", () => {
    before(() => {
      const mock = [[
        {
          "saleId": 1,
          "product_id": 1,
          "quantity": 4,
          "date": "2022-02-08T10:51:06.000Z"
        },
        {
          "saleId": 2,
          "product_id": 4,
          "quantity": 10,
          "date": "2022-02-08T10:50:06.000Z"
        },
      ]];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se retorna um array", async () => {
      const resolve = await salesModel.getAll();

      expect(resolve).to.be.an("array");
    });

    it("Testa se o array não está vazio", async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.not.empty;
    });

    it('Testa se o array possui as propriedades: "sale_id", "product_id", "date", e "quantity"', async () => {
      const [response] = await productModel.getAll();
      // console.log(response);
      expect(response).to.have.all.keys("saleId", "product_id", "quantity", "date");
    });
  });

  describe("Testa se 'id' de vendas de produto existe ", () => {
    before(() => {
      const mock = [[
        {
          "product_id": 1,
          "quantity": 4,
          "date": "2022-02-08T10:51:06.000Z"
        },
      ]];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se existe o id", async () => {
      const response = await salesModel.getById(2);
    
      expect(response).to.have.property("quantity");
      expect(response).to.be.an("array");

    });
    it("Testa se é um array", async () => {
      const response = await salesModel.getById(2);
      expect(response).to.be.an("array");
    });
  });

  describe("Testa se 'id' de vendas existe ", () => {
    before(() => {
      const mock = [[
        { id: 1, date: '2022-02-08T10:51:06.000Z' }
      ]];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se existe o date", async () => {
      const response = await salesModel.getById2(4);
    
      expect(response).to.have.property("date");
    });
  });

  describe("Testa se venda foi atualizado", () => {
    before(() => {
      const mock = [{ id: 1 [{ product_id: 2, quantity: 4 }] }];
      sinon.stub(conn, "execute").resolves(mock);
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se venda foi atualizada", async () => {
      const response = await salesModel.update(1, uupdateSales);

      expect(response).to.have.property('id');
    });

    it("Testa se retorna um object", async () => {
      const response = await salesModel.update(1, uupdateSales);
      
      expect(response).to.be.an('array');
    });
  });

  describe("Testa se 'id' do produto foi removido", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves();
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se foi deletado uma venda  com id esperado", async () => {
      const response = await salesModel.remove(5);

      expect(response).to.be.true;
    });
  });
});