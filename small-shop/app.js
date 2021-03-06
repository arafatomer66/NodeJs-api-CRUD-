
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://arafat:' + process.env.PW + '@online-shop-hamg5.mongodb.net/test?retryWrites=true&w=majority' , {
    useNewUrlParser: true ,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());
app.use('/uploads' ,express.static('uploads'));
app.use(cors());

app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);

app.use((req,res, next)=> {
      const error = new Error('Not found');
      error.status =404 ;
      next(error);
})

app.use((error, req,res, next)=> {
   res.status(error.status || 500);
   res.json({
       error : {
           message : error.message
       }
   })
})

module.exports = app ;




