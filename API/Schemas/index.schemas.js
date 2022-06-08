const {Type} = require('@sinclair/typebox');

exports.loginSchema = Type.Object({
    email: Type.String({
        format: 'email',
        required: true,
        errorMessage: {
            type:'El email debe ser un string',
            format: 'El email debe ser un email valido',
        },
    }),
    password: Type.String({
        type: 'string',
        required: true,
        errorMessage: {
            type:'El password debe ser un string',
        }
    }),
},
{
    aditionalProperties: false,
    errorMessage: {
        type: 'El body debe ser un objeto',
    }
});

exports.userSchema = {
    type: "object",
    properties: {
        name: {type: "string"},
        lastName: {type: "string"},
        email: {type: "string", format: "email"},
        password: {type: "string"},
        rol: {type: "string"},
    },
    required: ["name", "lastName", "email", "password", "rol"],
    additionalProperties: false
}

exports.productSchema ={
    type: "object",
    properties: {
        Nlote: {type: "integer"},
        name: {type: "string"},
        price: {type: "integer"},
    },
    required: ["name", "Nlote", "price", "amount"],
    additionalProperties: false
};

exports.salesSchema = {
    type: "object",
    properties: {
        totalPrice: {type: "integer"},
        userIdUser: {type: "integer"},
        productsBuy: {type: "array",
            items: {
                type: "object",
                properties: {
                    product: {type: "integer"},
                    amount: {type: "integer"},
                },
            }
        }
    },
    required: ["totalPrice", "userIdUser", "productsBuy"],
    additionalProperties: false
};

    

