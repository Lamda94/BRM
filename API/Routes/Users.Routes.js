const express = require('express');
const {validateToken} = require('../Middlewares/validateToken.js');
const {validateUser} = require("../Middlewares/ValiadteDTO");
const UserController = require('../Controllers/User.Controller.js');
const router = express.Router();

router.get('/', validateToken, UserController.findAll);
router.get('/:id', validateToken, UserController.findOne);
router.post('/', validateUser, validateToken, UserController.save);
router.put('/:id', validateToken, UserController.update);
router.delete('/:id', validateToken, UserController.delete);

module.exports = router;