const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('667bdc712c19cea95756f1a2')
    .then(user => {
      
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
const User = require('./models/user');

mongoose.connect('mongodb+srv://mag:fckswe@cluster0.mvll9m3.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
  console.log("connected")
  User.findOne().then(user => {
    if (!user) { 
      const user = new User({
        name:'magdy',
        email: 'mag@heirloom.me'
        ,
        cart: {
            items: []
            }
      })
      user.save().then(result => {console.log("user created",result)})
    }
  })
 
  app.listen(3000)

})  
