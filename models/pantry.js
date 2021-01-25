const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
  userId: { type: String},
  ingredients: Array
  
});

const Pantry = mongoose.model("Pantry", pantrySchema);

module.exports = Pantry;