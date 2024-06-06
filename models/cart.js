const { json } = require('body-parser');
const fs = require('fs')
const path = require('path');
const { findById } = require('./product');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

module.exports = class Cart {

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        JSON.parse(fileContent)
      }
      // analyze the cart        // updated product =  => the object with the id we looking for with set of properties ..., and the {}]
      const existingProductIndex = cart.products.findIndex(prod => prod.id == id)
      const existingProduct = cart.products[existingProductIndex]

      let updatedProduct
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        cart.products = { ...cart.products }
        cart.products[existingProductIndex] = updatedProduct
        console.log("Product exists it will be added to the quantity", updatedProduct)
        updatedProduct.qty = existingProduct.totalQuantity + 1
      }
      else {
        //
        updatedProduct = { id: id, qty: 1 }
        cart = { ...cart.products, updatedProduct }
      }
      cart.totalPrice = cart.totalPrice + productPrice
      cart = { ...cart.products, updatedProduct }
      console.log("cart", cart)
      fs.writeFile(p, JSON.stringify(cart), err => { console.log(err) })

    })




  }
}