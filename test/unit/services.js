const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../models/productsModel')
const productService = require('../../services/createServices');

//testes create
describe('Insere um novo produto no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {};

    it('retorna um boolean', async () => {
      const response = await productService.create(payloadProduct);

      // expect(response).to.be.a('boolean');

      expect(response).to.be.empty;
    });

    it('o boolean contém "false"', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      id: 1,
      name: 'Blusa',
      quantity: 10,
    }

    //mocando
    before(async () => {

      sinon.stub(productModel, 'create').resolves(payloadProduct);
    })

    // Restauraremos a função `execute` original após os testes.
    after(async () => {
      productModel.create.restore();
    })
  
    it('retorna um objeto', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productService.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

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
          name: 'Blusa',
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

      expect(item).to.include.all.keys(
        "id",
        "name",
        "quantity",
      );
    });
  });
});