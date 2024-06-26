const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema( {
  title: {
    type:String,
    required: true,
  }
  , price: {
    type: Number,
    required:true,
  },
  description: {
    type:String,
    required:true,
  },
  imageUrl: {
    type:String,
    required:true,
  },
  userId: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }
})

module.exports = mongoose.model('product',productSchema)
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')


// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title
//     this.price = price
//     this.imageUrl = imageUrl
//     this.description = description
//     this._id = id ? new mongodb.ObjectId(id) : null
//     this.userId = userId
//   }

//   static deleteById (prodId) {
//     const db = getDb()
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result => {
//       console.log('Deleted Product with ID: ', prodId)})
//       .catch(err => {console.log(err)})
//   }
//   save () {
//     const db = getDb()
//     let dbOp
    
//     if (this._id) {
//       dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})

//     }
    
//     else {
//       dbOp = db.collection('products').insertOne(this)
//     }
//     return dbOp.then(result => {
//     }).catch(err => {
//       console.log(err)
//       throw err
//       })

//   }
//   static findById (prodid) {
//     const db = getDb()
//     return db.collection('products').find( {_id: new mongodb.ObjectId(prodid) }).next().then(product => {
//       return product
//     })
//     .catch(err => {console.log(err)})
//   }

//   static fetchAll () {
//     const db = getDb()

//     return db.collection('products').find().toArray().then(products =>
//        {
//         return products
//       }).catch(err => {console.log(err)})
//   }
// }
  



// module.expor
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')


// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title
//     this.price = price
//     this.imageUrl = imageUrl
//     this.description = description
//     this._id = id ? new mongodb.ObjectId(id) : null
//     this.userId = userId
//   }

//   static deleteById (prodId) {
//     const db = getDb()
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result => {
//       console.log('Deleted Product with ID: ', prodId)})
//       .catch(err => {console.log(err)})
//   }
//   save () {
//     const db = getDb()
//     let dbOp
    
//     if (this._id) {
//       dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})

//     }
    
//     else {
//       dbOp = db.collection('products').insertOne(this)
//     }
//     return dbOp.then(result => {
//     }).catch(err => {
//       console.log(err)
//       throw err
//       })

//   }
//   static findById (prodid) {
//     const db = getDb()
//     return db.collection('products').find( {_id: new mongodb.ObjectId(prodid) }).next().then(product => {
//       return product
//     })router.get('/edit-product/:productId', adminController.getEditProduct);

//     .catch(err => {console.log(err)})
//   }

//   static fetchAll () {
//     const db = getDb()

//     return db.collection('products').find().toArray().then(products =>
//        {
//         return products
//       }).catch(err => {console.log(err)})
//   }
// }
  



// module.exports = Product;
// ts = Product;
