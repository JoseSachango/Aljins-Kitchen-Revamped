const router = require("express").Router()
const pantryController = require("../../controllers/pantryControllers")




router.route("/")
    // .get(pantryController.findAll)
    .post(pantryController.create)
    .delete(pantryController.remove);
    



module.exports = router