// WITH MONGODB DRIVER
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;

    this._id = id;
    this.cart = cart;   // {items: []}
  }

  save() {
    const db = getDb();
    return db.collection("User").insertOne(this);
  }
  createFirstCartItem(product){
    const  productId = new ObjectId(product._id)
    const updatedCart = {items:[{productId,quantity:1}]}
    const db = getDb();

    return db.collection('User').updateOne({ _id: new ObjectId(this._id)},{$set: {cart:updatedCart} })
    .then(result => { 
      return result    
      })  
    }
  

  addToCart(product) {
   
     
      }
addOrder() {
 const db = getDb()
 return this.getCart().then(products => {
  const order = { 
    items: products,
    user: { 
           _id: new ObjectId(this._id), 
           name:this.name,
           email:this.email
          }
        }
        return db.collection('orders').insertOne(order).then(result => {
          this.cart = { items:[] }
          
          return db.collection("User")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart:{ items:[] }  } }
        );
 })
})

 }
 getOrders() {
  const db = getDb()
  return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray()
 
 }
 
  
  getCart() { 
      const db = getDb()
      const productIds = this.cart.items.map(item => {
         return item.productId
          })

  return db.collection('products').find({ _id: { $in: productIds }}).toArray()
  .then(products => {
      return products.map(product => {
         return {...product,
                    quantity: this.cart.items.find(item => { 
                                                    return item.productId.toString() == product._id.toString() 
                                                   }).quantity
                }
              })
    
     })
  }

deleteCartItem(productId) {

  const filteredItems = [];

  this.cart.items.forEach((item) => {
  
    // If the item ID doesn't match the product ID, add it to the new array
    if (item.productId.toString() !== productId.toString()) {
      filteredItems.push(item);}})
      console.log("fultered items",filteredItems)
  const db = getDb()
  return db.collection('User')
  .updateOne(
    { _id: new ObjectId(this._id)}
    ,{  $set: { cart: {items: filteredItems} } })
    
}

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("User")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log("chhecking", user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
