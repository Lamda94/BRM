const User = require("../Class/User.Class.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.auth = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.auth(email, password);
        const accessToken = jwt.sign({...user.data}, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.accessToken = accessToken;
        req.session.user = JSON.stringify(user);
        res.header('authorization', accessToken).json({  menssage: "Usuario autenticado" });
    } catch (error) {
        console.log(error);        
    }
   
}

exports.login = async(req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="http://localhost:3000/auth" method="post">
            <input type="text" name="email" placeholder="login">
            <input type="password" name="password" placeholder="password">
            <input type="submit" value="Войти">
        </form>
    </body>
    </html>`);
}
