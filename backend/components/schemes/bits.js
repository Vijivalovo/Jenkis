const Joi = require("joi");

const createBit = Joi.object().keys({
    auction_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    bit: Joi.number().required(),
});

const buySlotAlready = Joi.object().keys({
    auction_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    bit: Joi.number().required(),
});

module.exports = {
    createBit: createBit,
    buySlotAlready: buySlotAlready,
};