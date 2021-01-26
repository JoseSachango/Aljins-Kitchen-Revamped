const router = require("express").Router()
const recipeController = require("../../controllers/recipeControllers")




router.route("/")
    .post(recipeController.createRecipe)
    
router.route("/:id")
    .get(recipeController.getOne)
    



module.exports = router