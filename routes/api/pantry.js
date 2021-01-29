const router = require("express").Router()
const pantryController = require("../../controllers/pantryControllers")


router.route("/")
    .post(pantryController.create)
    

router.route("/:id")
    .get(pantryController.getOne)
    .put(pantryController.updateOne)
    

module.exports = router