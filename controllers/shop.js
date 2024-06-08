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
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {

    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCartPrdocuts(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id == product.id)

        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty
          })

        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,

      })
    })
  })
}
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
exports.postDeleteCartItem = (req, res, next) => {
  console.log("beginning the process")
  const prodId = req.body.productId
  console.log("productid", prodId)
  getProductsFromFile(cart => {
    console.log(cart)
    const productIndex = cart.products.find(p => p.id == prodId)
    const product = cart[productIndex]

    cart.products.pop(product)

    // wRITE CHANGES TO CART FILE 
    parsedCart = JSON.stringify(cart)
    fs.writeFile(p, parsedCart, err => {
      console.log(err)
    })
    console.log("**********************************************")
    console.log("cart => deleted product with id", prodId)
    console.log("**********************************************")
  }
  )
  return res.redirect("/cart")
}
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
