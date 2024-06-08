const Product = require('../models/product');
const path = require('path')
const fs = require('fs')
const { get } = require('../routes/admin');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};
exports.postDeleteProduct = (req, res, next) => {

  const dbpaths = {
    prodPath: path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'),
    cartPath: path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'cart.json'),
  }
  const getProductsFromFile = cb => {
    fs.readFile(dbpaths.prodPath, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

  const prodId = req.params.productId
  getProductsFromFile(products => {
    productIndex = products.findIndex(p => p.id == prodId)
    console.log(productIndex)
    const product = products[productIndex]
    products.pop(products[productIndex])
    console.log(products)
    parsedProducts = JSON.stringify(products)
    fs.writeFile(p, parsedProducts, err => {
      console.log(err)
    })
    console.log("*************************")

    console.log("deleted product from  file", product)
  }
  )
  return res.redirect("/product-deleted")

}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
