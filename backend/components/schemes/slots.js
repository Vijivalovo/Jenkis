const Joi = require("joi");

const createSlot = Joi.object().keys({
    user_id: Joi.number().optional(),
    category: Joi.string().required(),
    minPrice: Joi.number().min(100).max(100000).required(),
    redemtionPrice: Joi.number().min(100).max(1000000000000).required(),
    saleTime: Joi.number().valid(12,24,48).required(),
    bidStep: Joi.number().min(5).max(50).required(),
    status: Joi.string().valid("О","А","П").optional(),
});


const updateSlot = Joi.object().keys({
    id: Joi.number().optional(),
    category: Joi.string().min(8).max(20).optional(),
    minPrice: Joi.number().min(100).max(100000).optional(),
    redemtionPrice: Joi.number().min(100).max(1000000000000).optional(),
    saleTime: Joi.number().valid(12,24,48).optional(),
    bidStep: Joi.number().min(5).max(50).optional(),
    status: Joi.string().valid("О","А","П").optional(),
});

module.exports = {
    createSlot: createSlot,
    updateSlot: updateSlot,
};
