const express = require('express');

const router = express();


router.get('/' , (req, res , next)=> {
      res.status(200).json({
          message : 'Handing get request /products'
      })
})



router.post('/' , (req, res , next)=> {
    const product = {
        name : req.body.name ,
        price : req.body.price

    };
    res.status(201).json({
        message : 'Handing post request /products' ,
        createdProduct : product
    })
})


router.get('/:productId' , (req, res , next)=> {
    const id = req.params.productId
    res.status(201).json({
        message : 'Handing get request for product number ' + id
    })
})


router.patch('/:productId' , (req, res , next)=> {
    const id = req.params.productId
    res.status(201).json({
        message : 'Updated product details for product number ' + id
    })
})


router.delete('/:productId' , (req, res , next)=> {
    const id = req.params.productId
    res.status(201).json({
        message : 'Deleted product of product number ' + id
    })
})
module.exports = router ; 