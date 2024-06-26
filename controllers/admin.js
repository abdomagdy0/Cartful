const Product = require('../models/product');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;

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
    const product = new Product( {
      title:title,
      price:price,
      description:description,
      imageUrl:imageUrl,
      userId:req.user
    }) 
    product.save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    }); 
};

 exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   if (!editMode) {
     return res.redirect('/');
   }
  const prodId = req.params.productId;
   Product.findById(prodId)
   .then(product => {
    if (!product) {
      return res.redirect('/');
    } res.render('admin/edit-product', {
              product: product,
              pageTitle: 'Edit Products',
              path: '/admin/edit-product',
              editing: editMode
                });
            }).catch(err => console.log(err))
         
         
        }

 exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId).then(product => { 
    product.title = updatedTitle
    product.price = updatedPrice
    product.description= updatedDesc
    product.imageUrl = updatedImageUrl
    return product.save()
  }).then(result => {
    console.log('PRODUCT UPDATED')
    return res.redirect("/admin/products")
  })
    .catch(err => console.log(err));
};

 exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    console.log("products fetched")

       res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
          });
 }).catch(Err => console.log(Err))
  
 }
 

 exports.postDeleteProduct = (req, res, next) => {
   const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
   .then(result => {
    console.log('DESTROYED PRODUCT');
    return res.redirect('/admin/products');
          })
          .catch(err => console.log(err));
        }
