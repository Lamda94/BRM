module.exports = (sequelize, dataType) => {
    const sale = sequelize.define('sale', {
        id_sale: {
            type: dataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },        
        datePurchase: {
            type: dataType.DATEONLY,
            allowNull: false
        },
        totalPrice: {
            type: dataType.INTEGER,
            allowNull: false
        },
        state: {
            type: dataType.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: dataType.DATEONLY
        },
        updatedAt: {
            type: dataType.DATEONLY
        },
    }, {
    freezeTableName: true,

    timestamps: false,
    createdAt: false

    });

    sale.removeAttribute('id');

    return sale;
};