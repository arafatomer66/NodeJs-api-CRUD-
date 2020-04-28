const express = require('express');
const Product = require('../models/product');
const router = express();
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    Product.find()
    .then(
        (docs) => {
            res.status(200).json(docs);
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
        }
    ).catch(err => {

        console.log(err);
        res.status(500).json({
            error : err
        })
    }
    );
    res.status(201).json({
        message: 'Handing post request /products',
        createdProduct: product
    })
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