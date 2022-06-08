const express = require('express');
const router = express.Router();
const {auth, login} = require('../Controllers/Login.Controller.js');

router.get('/', login);
router.post('/auth', auth);

module.exports = router;