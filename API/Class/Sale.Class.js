const db = require("../models");
const moment = require("moment");

const Sale = db.sale;
const ProductSale = db.ProductSales;
const Product = db.product;

class SaleClass {
    constructor(){}

    async getSales () {
        try {
            const sales = await Sale.findAll({
                where: { state: true },
                include: [{
                    model: db.user,
                    attributes: ["name", "lastname"]
                }, {
                    model: db.product,
                    attributes: ["name"]
                }]
            });
            return {
                status: 200,
                data: sales
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba las ventas"
            };
        }
    }

    async saveSale (data) {
        try {
            const sale = {
                datePurchase: moment().format("YYYY-MM-DD HH:mm:ss"),
                totalPrice: data.totalPrice,
                userIdUser: data.userIdUser,
                state: true,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
            }
            const search = await Sale.create(sale);
            const id =search.dataValues.id_sale;
            data.productsBuy.forEach(async (p) => {
                const ps = {
                    saleIdSale: id,
                    productIdProduct: p.product,
                    amountBuy: p.amount,
                };
                const validate = await Product.findOne({
                    where: { id_product: p.product }
                });
                if (validate) {
                   await ProductSale.create(ps);
                }else{
                    console.log("No existe el producto con id: " + p);
                }
            });
            
            return {
                status: 200,
                data: search
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba las ventas"
            };
        }
    }

    async getSale (id) {
        try {
            const sale = await Sale.findAll({
                where: { userIdUser: id },
                include: [{
                    model: db.user,
                    attributes: ["id_user", "name", "lastname"]
                }, {
                    model: db.product,
                    attributes: ["name"]
                }]
            });
            return {
                status: 200,
                data: sale
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba las ventas"
            };
        }
    }
        
    async updateSale (id, data) {
        data.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
        try {
            const sale = Sale.update(data, {
                where: { id }
            });
            return {
                status: 200,
                data: sale
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba las ventas"
            };
        }
    }
}

const saleClass = new SaleClass();
module.exports = saleClass;