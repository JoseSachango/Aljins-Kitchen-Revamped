const router = require("express").Router()
const pantryController = require("../../controllers/pantryControllers")


router.route("/")
    // .get(pantryController.findAll)
    .post(pantryController.create)
    .delete(pantryController.remove);
    

router.route("/:id")
    .get(pantryController.findById)
    

module.exports = router