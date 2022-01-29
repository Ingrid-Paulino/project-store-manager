const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../models/connection')
const productModel = require('../../models/productsModel')

//testes create
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

// testes obiter todos
describe("consulta de todos os produtos do BD", () => {
  describe("quando não existe produto criado", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves([[]]);
    });

    after(() => {
      conn.execute.restore();
    });

    it("retorna um array", async () => {
      const response = await productModel.getAll();

      expect(response).to.be.an("array");
    });

    it("retorna um array vazio", async () => {
      const response = await productModel.getAll();

      expect(response).to.be.empty;
    });
  });

  describe("quando existe produtos criados", () => {
    before(() => {
      sinon.stub(conn, "execute").resolves([
        [
          { 
            id: 1,
            name: 'Blusa',
            quantity: 10
          },
        ],
      ]);
    });

    after(() => {
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

      expect(item).to.include.all.keys(
        "id",
        "name",
        "quantity",
      );
    });
  });
});