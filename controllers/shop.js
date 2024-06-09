const Product = require('../models/product');
const path = require('path')
const fs = require('fs')
const Cart = require('../models/cart');
const p = path.join(
  path.dirname(process.mainModule.filename), 'data', 'cart.json')

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}
exports.getProducts = (req, res, next) => {

  Product.fetchAll().then(([rows, tableInfo]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });

  }).catch(err => { console.log(err) })


};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });

  }
  ).catch(err => console.log(err))


};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products[0],
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

}
res.render('shop/cart', {
  path: '/cart',
  pageTitle: 'Your Cart',
  products: cartProducts,

})

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then()
  res.redirect('/cart');
};
exports.postDeleteCartItem = (req, res, next) => {

  console.log("**********************************************")
  console.log("cart => deleted product with id", prodId)
  console.log("**********************************************")
}

return res.redirect("/cart")

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
