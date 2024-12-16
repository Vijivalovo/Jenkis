const mongoose = require("mongoose");
const errorSchema = new mongoose.Schema({
  status: Number,
  message: String,
  type: String,
  route: String,
  timestamp: Date,
});

let Error;
try {
  Error = mongoose.model("Error");
} catch (error) {
  Error = mongoose.model("Error", errorSchema);
}

module.exports = Error;
