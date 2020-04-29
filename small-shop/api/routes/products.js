const express = require('express');
const Product = require('../models/product');
const router = express();
const mongoose = require('mongoose');
const mainUrl = 'http://localhost:3000/';
const route = 'products/';

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .then(
        (docs) => {
            const response = {
                count : docs.length ,
                products : docs.map( doc => {
                    return {
                        name : doc.name ,
                        price : doc.price ,
                        _id : doc._id ,
                        request : {
                            type : 'GET' ,
                            url :  mainUrl + route +  doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }
    )
    .catch(
        (err) => {
            res.status(500).json({
                error : err
            })
        }
    )
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(
        (result) => {
            console.log(result);
            res.status(201).json({
                message: 'Product created successfully',
                createdProduct: {
                    name : result.name ,
                        price : result.price ,
                        _id : result._id ,
                        request : {
                            type : 'GET' ,
                            url :  mainUrl + route +  result._id
                        }
                }
            })
        }
    ).catch(err => {

        console.log(err);
        res.status(500).json({
            error : err
        })
    }
    );
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json(doc)
            }else {
                res.status(404).json({
                    message : "Not valid"
                })
            }
        })
        .catch(
            err => {
                res.status(500).json({
                    error : err
                })
            }
        );
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId ;
    updateOps = {} ;
    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }
    Product.update({_id : id},{ $set : updateOps }).then(
        result => {
            res.status(201).json(result);
        }
    );
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId ;
    Product.remove({
        _id : id 
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    })
})
module.exports = router;