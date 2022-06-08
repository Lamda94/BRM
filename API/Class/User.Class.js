const db = require("../models");
const moment = require("moment");
const Op = db.Sequelize.Op;

const User = db.user;

class user {
    constructor(){}
    async getUsers () {
        try {
            const users = await User.findAll({
                where: { state: true },
            });
    
            if (users.length > 0) {
                return {
                    status: 200,
                    data: users
                };
            } else {
                return {
                    status: 404,
                    data: "No se encontraron usuarios"
                };
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }

    async getUsersByRol (rol) {
        try {
            const users = await User.findAll({
                where: { state: true, rol:rol },
           });

            if (users.length > 0) {
                return {
                    status: 200,
                    data: users
                };
            } else {
                return {
                    status: 404,
                    data: "No se encontraron usuarios"
                };
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }

    async getUsersById (id) {
        try {
            const users = await User.findAll({
                where: { id_user:id },
            });
            if (users.length > 0) {
                return {
                    status: 200,
                    data: users
                };
            } else {
                return {
                    status: 404,
                    data: "No se encontraron usuarios"
                };
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }
    
    async saveUser (data) {
        try {
            data.state = true;
            data.createdAt = moment().format('YYYY-MM-DD');
            data.updatedAt = moment().format('YYYY-MM-DD');
            const user = await User.create(data);
            console.log("User:"+user);
            return {
                status: 200,
                data: user
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }

    async getByName (search) {
        try {
            const users = await User.findAll({
                where: { state: true, name: { [Op.like]: `%${search}%` } },
            });
            if (users.length > 0) {
                return {
                    status: 200,
                    data: users
                };
            }else{
                return {
                    status: 404,
                    data: "No se encontraron usuarios"
                };
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }
       
    async updateUser (id, data) {
        data.updatedAt = moment().format('YYYY-MM-DD');
        try {
            const user = await User.update(data, {
                where: {
                    id_user: id
                }
            });
            return {
                status: 200,
                data: user
            };
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }
        
    async deleteUser(id) {
        const user = await this.getUsersById(id);
        if (user.data.length > 0) {
            try {
                const user = await User.update({
                    state: false,
                    updatedAt: moment().format('YYYY-MM-DD')
                }, {
                    where: {
                        id_user: id
                    }
                });
                return {
                    status: 200,
                    data: user
                };
            } catch (error) {
                return {
                    status: 500,
                    data: error.message || "Se produjo un error mientras buscaba los usuarios"
                };
            }
        } else {
            return {
                status: 404,
                data: "No se encontró el usuario"
            };
        }
    }

    async auth (email, password) {
        try {
            const user = await User.findOne({
                where: { state: true, email, password },
            });
            if (user) {
                return {
                    status: 200,
                    data: user
                };
            } else {
                return {
                    status: 404,
                    data: "No se encontraron usuarios"
                };
            }
        } catch (error) {
            return {
                status: 500,
                data: error.message || "Se produjo un error mientras buscaba los usuarios"
            };
        }
    }
}

const objtUser = new user();
module.exports = objtUser;