module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "root",
    PASSWORD: process.env.PASSWORD || "Root1234",
    DB: process.env.DB || "BRM-Inventario",
    PORT: process.env.DBPORT || "3306",
    dialect: process.env.DBMOTOR || "mysql",
    timezone: process.env.TIMEZONE || 'utc',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };