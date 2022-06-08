const Ajv = require('ajv');
const addFormat = require('ajv-formats');
const addErrors = require('ajv-errors');
const { 
        loginSchema,
        userSchema,
        productSchema,
        salesSchema,
        rolSchema
      } = require('../Schemas/index.schemas');

const ajv = new Ajv({allErrors: true});
addFormat(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);


exports.validateLogin = (req, res, next) => {
    const valid = ajv.complie(loginSchema);
    if (!valid(req.body)) {
        res.status(400).send({
            message: ajv.errorsText(ajv.errors),
        });
    } else {
        next();
    }
}

exports.validateUser = (req, res, next) => {
    const valid = ajv.compile(userSchema);
    console.log(userSchema);
    if (!valid(req.body)) {
        console.log(req.body);
        res.status(400).send({
            message: ajv.errorsText(ajv.errors),
        });
    } else {
        
        next();
    }
}

exports.validateProduct = (req, res, next) => {
    const valid = ajv.compile(productSchema);
    if (!valid(req.body)) {
        res.status(400).send({
            message: ajv.errorsText(ajv.errors),
        });
    } else {
        next();
    }
}

exports.validateSales = (req, res, next) => {
    console.log("entro");
    console.log(req.body);
    const valid = ajv.compile(salesSchema);
    if (!valid(req.body)) {
        res.status(400).send({
            message: ajv.errorsText(ajv.errors),
        });
    } else {
        next();
    }
}



