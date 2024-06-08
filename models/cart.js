const fs = require('fs');
const path = require('path')
const prodpaths = require('./product')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);

      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    })

  }
  static getCartPrdocuts(cb) {
    const dbpaths = {
      prodPath: path.join(
        path.dirname(process.mainModule.filename), 'data', 'products.json'), cartPath: path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json'),
    }
    const p = dbpaths.cartPath
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const cart = JSON.parse(fileContent)
        return cb(cart)
      }
      else {
        console.log("err")
        cb(err)
      }



    })
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, content => {
      if (content) {
        const cart = JSON.parse(content)
        const updatedCart = { ...cart }
        const product = updatedCart.find(p => p.id == id)
        updatedCart.products = updatedCart.products.filter(p => p.id !== id)
        const productQty = product.qty

        cart.totalPrice = cart.totalPrice - ProductPrice * productQty


        fs.writeFile(p, JSON.stringify(updatedCart), err => {
          console.log(err);
        });



      }
    })
  }
}