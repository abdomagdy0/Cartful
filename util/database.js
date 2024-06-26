// const mongodb = require('mongodb')
// const MongoClient = mongodb.MangoClient
// const url = 'mongodb+srv://mag:fckswe@cluster0.mvll9m3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// let _db
// const mangoConnect = (cb) => {
//   const mongoClient = new mongodb.MongoClient(url)
//   mongoClient.connect()
//     .then(client => {
//       if (client){ 
//         console.log("connected")
       
//         _db = client.db('shop')
//         cb(client)
//       }
     
//     })
//     .catch(err => {
//       console.log(err)
//       throw err

//     })
//   }
//     const getDb = () =>{
//      if (_db){
//       return _db
//      }
//      throw "no database connection found"
//     }



// // const mangoConnect = (callback => {
// //   MongoClient.connect('mongodb+srv://mag:fckswe@cluster0.mvll9m3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// //   .then(result => {
// //     return callback(result)

// //   }).catch(err => console.log(err))


// // })
// exports.mangoConnect = mangoConnect
// exports.getDb = getDb