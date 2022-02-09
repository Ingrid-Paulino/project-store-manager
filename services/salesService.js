// const { atualizaQuantidadeDeProdutos } = require('../models/productsModel');

const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const create = async (itensSold) => salesModel.create(itensSold);

const getAllsales = async () => salesModel.getAll();
 
const getIdSales = async (id) => {
  const productId = await salesModel.getById(id);

  if (!productId.length) return { status: 404, message: 'Sale not found' };
  // ou
  // if (productId.length === 0) return { status: 404, message: 'Sale not found' };

  return productId;
};

const updateSales = async (id, uupdateSales) => {
  // console.log('fgfg', uupdateSales);
  const salesId = await salesModel.getById2(id);

  if (!salesId) return { status: 404, message: 'Sales not found' };

  const listaProdutosVenda = await salesModel.getById(id);

   uupdateSales.forEach(async (produtoSaleAtual) => {
    const produtoSaleAtualId = produtoSaleAtual.product_id;
    const ProdutoSaleAntigo = listaProdutosVenda.find(
      (produtoSaleAntigo) => produtoSaleAntigo.product_id === produtoSaleAtualId,
      );

    const diferencaQtd = ProdutoSaleAntigo.quantity - produtoSaleAtual.quantity;

    await productModel.atualizaQuantidadeDeProdutos(produtoSaleAtualId, diferencaQtd);
    // console.log({ ProdutoSaleAntigo, produtoSaleAtual, produtoSaleAtualId, diferencaQtd });
  });

  // console.log({ listaProdutosVenda, uupdateSales });
  
  await Promise.all(uupdateSales);
  const update = await salesModel.update(id, uupdateSales);
  
  return update;
}; 

const remove = async (id) => {
  const salesId = await salesModel.getById(id);
  // console.log('salesId1', salesId);

  if (!salesId.length) return { status: 404, message: 'Sale not found' };
  // console.log('salesId2', salesId);
  
  // await salesId.map(async (item) => {
  //   // console.log('item', item);
  //   await salesModel.remove(id, item);
  // });

  await Promise.all(salesId.map(async (item) => {
    // console.log('item', item);
    await salesModel.remove(id, item);
    await productModel.atualizaQuantidadeDeProdutos(item.product_id, item.quantity);
  }));

  console.log('salesId', salesId);
  return salesId;
};

module.exports = {
  create,
  getAllsales,
  getIdSales,
  updateSales,
  remove,
  // getLastSale,
};