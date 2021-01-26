const router = require("express").Router();
const pantryRoutes = require("./pantry");
const recipeRoutes = require("./recipe")

// pantry routes
router.use("/pantry", pantryRoutes);
router.use("/recipe", recipeRoutes);



module.exports = router;
