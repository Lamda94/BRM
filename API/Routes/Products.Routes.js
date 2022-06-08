const express = require('express');
const {validateToken} = require('../Middlewares/validateToken.js');
const {validateProduct} = require("../Middlewares/ValiadteDTO");
const ProController = require('../Controllers/Product.Controller.js');
const router = express.Router();

router.get('/', validateToken, ProController.getProducts);
router.get('/:id', validateToken, ProController.getProduct);
router.post('/', validateToken, validateProduct, ProController.saveProduct);
router.put('/:id', validateToken, ProController.updateProduct);
router.delete('/:id', validateToken, ProController.deleteProduct);

module.exports = router;