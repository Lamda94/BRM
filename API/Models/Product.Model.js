module.exports = (sequelize, dataType) => {
    const product = sequelize.define('product', {
        id_product: {
            type: dataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        
        Nlote: {
            type: dataType.INTEGER,
            allowNull: false
        },

        name: {
            type: dataType.STRING(100),
            allowNull: false
        },

        price: {
            type: dataType.INTEGER,
            allowNull: false
        },

        dateIn: {
            type: dataType.DATEONLY,
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

    product.removeAttribute('id');

    return product;
};