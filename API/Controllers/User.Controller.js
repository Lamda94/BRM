const User = require("../Class/User.Class.js");

exports.save = async (req, res) => {
    try {
        const data = req.body;
        const response = await User.saveUser(data);
        const status = response.status;
        const da = response.data;
        res.status(status).send(da);   
    } catch (error) {
        res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los usuarios"
        });
    }
};

exports.findAll = async (req, res) => {
    const userLogin = JSON.parse(req.session.user);
    const rol = userLogin.data.rol;
    if (rol == "Admin") {
        try {
            const reponse = await User.getUsers();
            const status = reponse.status;
            const data = reponse.data;
            res.status(status).send(data);      
        } catch (error) {
            return res.status(500).send({
                message: error.message || "Se produjo un error mientras buscaba los usuarios"
            });
        }
    } else {
        res.send({menssage: "No tiene permisos para ver esta información"});
    }
};

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await User.getUsersById(id);
        res.status(response.status).send(response.data);    
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los usuarios"
        });
    }
};

exports.findName = async (req, res) => {
    try{
        const search = req.params.search;    
        const response = await User.getByName(search);
        res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los usuarios"
        });
    }
};

exports.update = async (req, res) => {
    console.log("entro");
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await User.updateUser(id, data);
        res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los usuarios"
        });
    }
};
  
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const reponse = await User.deleteUser(id);
        res.status(reponse.status).send(reponse.data);
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Se produjo un error mientras buscaba los usuarios"
        });        
    }
};

 
  
  