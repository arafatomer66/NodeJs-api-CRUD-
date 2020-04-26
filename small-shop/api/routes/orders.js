const express = require('express');

const router = express();


router.get('/' , (req, res , next)=> {
      res.status(200).json({
          message : 'Orders were fetched /orders'
      })
})



router.post('/' , (req, res , next)=> {
    const order = {
        productId : req.body.productId ,
        quantity : req.body.quantity
    };
    res.status(201).json({
        message : 'Handing post request /orders',
        order : order
    })
})


router.get('/:orderId' , (req, res , next)=> {
    const id = req.params.orderId
    res.status(201).json({
        message : 'Handing get request for order number ' + id
    })
})


router.patch('/:orderId' , (req, res , next)=> {
    const id = req.params.orderId
    res.status(201).json({
        message : 'Updated order details for order number ' + id
    })
})


router.delete('/:productId' , (req, res , next)=> {
    const id = req.params.productId
    res.status(201).json({
        message : 'Deleted order of orderId ' + id
    })
})
module.exports = router ; 