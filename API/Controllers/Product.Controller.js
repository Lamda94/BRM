const Product = require("../Class/Products.Class.js");

exports.getProducts = async (req, res) => {
    try {
        const response = await Product.getProducts();
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los productos"
        });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Product.getProduct(id);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los productos"
        });
    }
}

exports.saveProduct = async (req, res) => {
    try {
        const data = req.body;
        const response = await Product.saveProduct(data);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los productos"
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await Product.updateProduct(id, data);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los productos"
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Product.deleteProduct(id);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los productos"
        });
    }
}