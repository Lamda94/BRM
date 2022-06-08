const express = require('express');
const {validateToken} = require('../Middlewares/validateToken.js');
const {validateSales} = require("../Middlewares/ValiadteDTO");
const SaleController = require('../Controllers/Sale.Controllers.js');
const router = express.Router();

router.get('/', validateToken, SaleController.getSales);
router.get('/:id', validateToken, SaleController.getSale);
router.post('/', validateToken, validateSales ,SaleController.saveSale);

module.exports = router;