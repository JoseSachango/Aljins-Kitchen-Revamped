const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedSchema = new Schema({
    userId: { type: String },
    recipeID: Array,
    recipeName: { type: String },
    recipeImg: { type: String },
    recipeUrl: { type: String },

});

const Pantry = mongoose.model("Saved", savedSchema);

module.exports = Pantry;