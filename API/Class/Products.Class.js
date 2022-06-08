const db = require("../models");
const moment = require("moment");

const Pducts = db.product;

class Product {
    constructor(){}
    async getProducts () {
        try {
            const products = await Pducts.findAll({
                where: { state: true },
            });
            if (products.length > 0) {
                return {
                    status: 200,
                    data: products
                };
            }
            return {
                status: 404,
                data: "No se encontraron productos"
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los productos"
            };
        }
    }

    async saveProduct (data) {
        try {
            data.state = true;
            data.dateIn = moment().format("YYYY-MM-DD HH:mm:ss");
            data.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
            data.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
            const product = await Pducts.findAll({
                where: { name: data.name }
            });
            if (product.length > 0) {
                return {
                    status: 400,
                    data: "El producto ya existe"
                };
            }
            const search = await Pducts.create(data);
            return {
                status: 200,
                data: search
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los productos"
            };
        }
    }

    async getProduct (id) {
        try {
            const product = await Pducts.findOne({
                where: { id_product:id },
            });
            if (product) {
                return {
                    status: 200,
                    data: product
                };
            }
            return {
                status: 404,
                data: "El producto no existe"
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los productos"
            };
        }
    }

    async updateProduct (id, data) {
        try {
            const product = await Pducts.findOne({
                where: { id_product:id }
            });
            if (product) {
                data.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
                const update = await Pducts.update(data, {
                    where: { id_product:id }
                });
                return {
                    status: 200,
                    data: update
                };
            }
            return {
                status: 404,
                data: "El producto no existe"
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los productos"
            };
        }
    }

    async deleteProduct (id) {
        try {
            const product = await Pducts.findOne({
                where: { id_product:id }
            });
            if (product) {
                const deleteProduct = await Pducts.update({
                    state: false
                }, {
                    where: { id_product:id }
                });
                return {
                    status: 200,
                    data: deleteProduct
                };
            }
            return {
                status: 404,
                data: "El producto no existe"
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los productos"
            };
        }
    }
}

const objProduct = new Product();

module.exports = objProduct;