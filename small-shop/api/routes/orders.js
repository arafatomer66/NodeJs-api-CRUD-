const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const router = express();
const mongoose = require('mongoose');
const mainUrl = 'http://localhost:3000/';
const route = 'orders/';

router.get('/' , (req, res , next)=> {
    Order
    .find()
    .populate('product' , 'name')
    .select('_id product quantity')
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json({
            message : "Order fetched" ,
            count : result.length ,
            orders : result.map(res => {
                return {
                    _id : res._id ,
                    quantity : res.quantity ,
                    product : res.product ,
                    request : {
                        type : "Get" ,
                        url : mainUrl + route + res._id
                    }
                }
            })

            }
)
    } )
    .catch( err => {
        res.status(500).json({
            message : err
        })
    } )
})

router.post('/' , (req, res , next)=> {
    Product.findById(req.body.productId)
    .then( product => {
        if(!product){
          return res.status(404).json({
              message : "Product not found !"
          })
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId() ,
            quantity : req.body.quantity,
            product : req.body.productId
        });
        return order.save();
    } ).then( result => {
        console.log(result);
            res.status(201).json({
                message : "Order created" ,
                createdOrder : {
                    _id : result._id ,
                    quantity : result.quantity ,
                    product : result.product ,
                    response : {
                        type : "Get" ,
                        url : mainUrl + route + result._id
                    }
                }
            })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
})

router.get('/:orderId' , (req, res , next)=> {
    const id = req.params.orderId ;
    Order
    .findById(id)
    .populate('product' , 'name')
    .select('_id quantity product')
    .then( result => {
        if(!result){
            res.status(404).json({
                message : "Order not found"
            })
        }
        res.status(201).json({
            message : 'Handing get request for order number ' + id ,
            order : result
        })
    } )
})

router.patch('/:orderId' , (req, res , next)=> {
    const id = req.params.orderId
    res.status(201).json({
        message : 'Updated order details for order number ' + id
    })
})

router.delete('/:orderId' , (req, res , next)=> {
    const id = req.params.orderId ;
    Order.remove({ _id :id}).then( response => {
        res.status(201).json({
            message : 'Deleted order of orderId ' + id ,
            response : response ,
            request : {
                type : "POST" ,
                url : mainUrl+route ,
                body : {
                    productId :"Id",
                    quantity : "Number"
                }
            }
        })
    }).catch( err => {
        res.status(500).json({
            response : err
        })
    })
})

module.exports = router ;