//usar la configuracion de la base de datos
const dbConfig = require("../config/db.config");
const db = {};

const Sequelize = require("sequelize");
const conexion = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  benchmark: false,
  logging: false,
  force: false,
  alter: true,
  dialectOptions: {
    timezone: process.env.db_timezone
  },

  //pool de conexion a la base de datos
  pool: {
    //maximo en conexiones
    max: dbConfig.pool.max,
    //minimo de conexiones
    min: dbConfig.pool.min,
    //tiempo maximo en milisegundo en que se intentara obtener la conexion antes de lanzar un error 
    acquire: dbConfig.pool.acquire,
    //tiempo maximo en milisegundos que una conexion puede esta inactiva antes de liberarse
    idle: dbConfig.pool.idle,
  },
});

//verificacion de la conexion al servidor
conexion
  .authenticate()
  .then(() => {
    console.log("conexion establecida");
  })
  .catch(err => {
    console.error("problemas en la ocnexion con la base de datos", err);
  });

db.Sequelize = Sequelize;
db.conexion = conexion;

//importacion de los modelos
db.user = require("./User.Model")(conexion, Sequelize);
db.product = require("./Product.Model")(conexion, Sequelize);
db.sale = require("./saleHistory.Model")(conexion, Sequelize);
const ProductSale = conexion.define('ProductSale', {
  PSId: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  amountBuy: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,

  timestamps: false,
  createdAt: false

});

db.user.hasMany(db.sale);
db.sale.belongsTo(db.user);

db.product.belongsToMany(db.sale, { through: ProductSale });
db.sale.belongsToMany(db.product, { through: ProductSale });

(async ()=>{
  try {
    await db.user.sync();
    await db.product.sync();
    await db.sale.sync();
    await ProductSale.sync();
  } catch (error) {
    console.log(error);
  }
})()
db.ProductSales = ProductSale;
module.exports = db;