const Joi = require("joi");

const registration = Joi.object().keys({
    role: Joi.boolean().optional(),
    lastname: Joi.string().max(15).required(),
    firstname: Joi.string().max(15).required(),
    patronymic: Joi.string().max(15).required(),
    password: Joi.string().min(4).max(20).required(),
    datebirth: Joi.date().min('1955-01-01').max('2024-01-28').optional(),
    wallet: Joi.number().max(100000000000).required(),
});

const login = Joi.object().keys({
    lastname: Joi.string().max(15).required(),
    firstname: Joi.string().max(15).required(),
    patronymic: Joi.string().max(15).required(),
    password: Joi.string().min(4).max(20).required(),
    datebirth: Joi.date().optional(),
});

module.exports = {
    registration: registration,
    login: login,
};

