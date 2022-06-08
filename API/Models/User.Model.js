module.exports = (sequelize, dataType) => {
    const user = sequelize.define('user', {
        id_user: {
            type: dataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataType.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataType.STRING(100),
            allowNull: false
        },
        email: {
            type: dataType.STRING(100),
            allowNull: false
        },
        password: {
            type: dataType.STRING(100),
            allowNull: false
        },
        rol:{
            type: dataType.STRING(100),
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

    user.removeAttribute('id');

    return user;
};