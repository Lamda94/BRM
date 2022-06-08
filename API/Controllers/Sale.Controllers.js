const Sale = require("../Class/Sale.Class.js");

exports.getSales = async (req, res) => {
    try {
        const response = await Sale.getSales();
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba las ventas"
        });
    }
}

exports.getSale = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Sale.getSale(id);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba las ventas"
        });
    }
}

exports.saveSale = async (req, res) => {
    try {
        const data = req.body;
        const response = await Sale.saveSale(data);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba las ventas"
        });
    }
}