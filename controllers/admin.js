const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  //path to edit html
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    // path for URL
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
    , editing: "false"
    , product: ''
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.edit
  const prodId = req.params.productId
  if (!editmode) {
    console.log('editing mode disabled')
    return res.redirect('/')
  }
  console.log("printing the id", req.params.productId)

  Product.findById(prodId, product => {
    if (!product) { console.log("product object is unidentified"); return res.redirect('/') }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product/:productId',
      editing: editmode,
      product: product
    });

  })


  //exports.postEditProduct =
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
