const sinon = require("sinon");
const { expect } = require("chai");
const conn = require("../../models/connection");
const productModel = require("../../models/productsModel");

//testes create
describe("Tests products", () => {
  describe("Insere um novo produto no BD", () => {
    describe("quando é inserido com sucesso", () => {
      const payloadProduct = {
        name: "Blusa",
        quantity: 10,
      };

      //mocando
      before(async () => {
        const execute = [{ insertId: 1 }]; // retorno esperado nesse teste
        sinon.stub(conn, "execute").resolves(execute);
      });

      // Restauraremos a função `execute` original após os testes.
      after(async () => {
        conn.execute.restore();
      });
      it("retorna um objeto", async () => {
        const response = await productModel.create(payloadProduct);
        expect(response).to.be.a("object");
      });

      it('tal objeto possui o "id" do novo produto inserido', async () => {
        const response = await productModel.create(payloadProduct);

        expect(response).to.have.a.property("id");
      });
    });
  });

  // testes obiter todos
  describe("consulta de todos os produtos do BD", () => {
    describe("quando não existe produto criado", () => {
      before(async () => {
        const mock = [[]];
        sinon.stub(conn, "execute").resolves(mock);
      });

      after(async () => {
        conn.execute.restore();
      });

      it("retorna um array", async () => {
        // response ou rows
        const response = await productModel.getAll();
        expect(response).to.be.an("array");
      });

      it("retorna um array vazio", async () => {
        const response = await productModel.getAll();
        expect(response).to.be.empty;
      });
    });

    describe("quando existe produtos criados", () => {
      const mockedProduct = [
        [
          {
            id: 1,
            name: "Blusa",
            quantity: 10,
          },
        ],
      ];

      before(async () => {
        const mock = [[mockedProduct]];
        sinon.stub(conn, "execute").resolves(mock);
      });

      after(async () => {
        conn.execute.restore();
      });

      it("retorna um array", async () => {
        const response = await productModel.getAll();
        expect(response).to.be.an("array");
      });

      it("o array não está vazio", async () => {
        const response = await productModel.getAll();
        expect(response).to.be.not.empty;
      });

      it('tais itens possui as propriedades: "id", "name", e "quantity"', async () => {
        const [item] = await productModel.getAll();
        expect(item).to.include.all.keys("id", "name", "quantity");

        // expect(item).to.have.all.keys([
        //   "id",
        //   "name",
        //   "quantity",
        // ]);
      });
    });
  });

  describe("Atualiza produto", () => {
    describe("quando não existe o produto", () => {
      before(async () => {
        const mock = {};
        sinon.stub(conn, "execute").resolves(mock);
      });

      after(async () => {
        conn.execute.restore();
      });

      it("retorna um objeto", async () => {
        // response ou rows
        const response = await productModel.update();
        expect(response).to.be.an("object");
      });

      it("retorna um objeto vazio", async () => {
        const response = await productModel.update();
        expect(response).to.be.empty;
      });
    });

    describe("quando produtos é atualizado", () => {
      const mockedProduct = {
        id: 2,
        name: "Blusa 1",
        quantity: 15,
      };

      before(async () => {
        const mock = mockedProduct;
        sinon.stub(conn, "execute").resolves(mock);
      });

      after(async () => {
        conn.execute.restore();
      });

      it("retorna um objeto", async () => {
        const response = await productModel.update();
        expect(response).to.be.an("object");
      });

      it("o array não está vazio", async () => {
        const response = await productModel.update();
        expect(response).to.be.not.empty;
      });

      it('tais itens possui as propriedades: "id", "name", e "quantity"', async () => {
        const [item] = await productModel.update();
        expect(item).to.include.all.keys("id", "name", "quantity");

        // expect(item).to.have.all.keys([
        //   "id",
        //   "name",
        //   "quantity",
        // ]);
      });
    });
  });

  // describe("Deleta produto", () => {
  //   test("id não exite", () => {
  //     before(async () => {
  //       const mock = 1;
  //       sinon.stub(conn, "execute").resolves(mock);
  //     });

  //     after(async () => {
  //       conn.execute.restore();
  //     });


  //   });
  // });
});
