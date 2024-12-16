const Users = require ("./users");
const Solds = require ("./solds");
const Slots = require ("./slots");
const Selects = require ("./selects");
const Bits = require ("./bits");
const Auctions = require ("./auctions");
const Tokens = require ("./tokens");


Users.hasMany(Bits, { foreignKey: "user_id", onDelete: "CASCADE"});
Bits.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE"});
Users.hasMany(Slots, { foreignKey: "user_id", onDelete: "CASCADE"});
Slots.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE"});
Users.hasMany(Selects, { foreignKey: "user_id", onDelete: "CASCADE"});
Selects.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE"});
Users.hasOne(Tokens, { foreignKey: "user_id", onDelete: "CASCADE"});
Tokens.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE"});
Users.hasOne(Solds, { foreignKey: "user_id", onDelete: "CASCADE"});
Solds.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE"});


Slots.hasOne(Auctions, { foreignKey: "slot_id", onDelete: "CASCADE"});
Auctions.belongsTo(Slots, { foreignKey: "slot_id", onDelete: "CASCADE"});
Slots.hasOne(Solds, { foreignKey: "slot_id", onDelete: "CASCADE"});
Solds.belongsTo(Slots, { foreignKey: "slot_id", onDelete: "CASCADE"});
Slots.hasMany(Selects, { foreignKey: "slot_id", onDelete: "CASCADE"});
Selects.belongsTo(Slots, { foreignKey: "slot_id", onDelete: "CASCADE"});


Auctions.hasMany(Bits, { foreignKey: "auction_id", onDelete: "CASCADE"});
Bits.belongsTo(Auctions, { foreignKey: "auction_id", onDelete: "CASCADE"});